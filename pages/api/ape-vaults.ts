import	{ethers}				from	'ethers';
import	{Provider, Contract}	from	'ethcall';
import	{toAddress}				from	'utils';

export function getProvider(chain = 1): ethers.providers.Provider {
	if (chain === 1) {
		return new ethers.providers.InfuraProvider('homestead', '9aa3d95b3bc440fa88ea12eaa4456161');
	} else if (chain === 137) {
		return new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');
	} else if (chain === 250) {
		return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
	} else if (chain === 56) {
		return new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');
	} else if (chain === 1337) {
		return new ethers.providers.JsonRpcProvider('http://localhost:8545');
	} else if (chain === 42161) {
		return new ethers.providers.JsonRpcProvider('https://arbitrum.public-rpc.com');
	} 
	return new ethers.providers.InfuraProvider('homestead', '9aa3d95b3bc440fa88ea12eaa4456161');
}

export async function newEthCallProvider(provider: ethers.providers.Provider, chainID: number): Promise<Provider> {
	const	ethcallProvider = new Provider();
	if (chainID === 1337) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		ethcallProvider.multicall = {address: '0xc04d660976c923ddba750341fe5923e47900cf24', block: 0};
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	if (chainID === 250) {
		ethcallProvider.multicall = {address: '0xc04d660976c923ddba750341fe5923e47900cf24', block: 0};
	}
	if (chainID === 42161) {
		ethcallProvider.multicall = {address: '0x10126Ceb60954BC35049f24e819A380c505f8a0F', block: 0};
	}
	return	ethcallProvider;
}

async function fetchStrategies({vaultAddress, network}: {vaultAddress: string, network: number}): Promise<string[]> {
	const	vaultContract = new Contract(
		vaultAddress,
		[{'stateMutability': 'view', 'type': 'function', 'name': 'withdrawalQueue', 'inputs': [{'name': 'arg0', 'type': 'uint256'}], 'outputs': [{'name': '', 'type': 'address'}], 'gas': '4057'}]
	);
	const	strategiesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	const 	calls = [];
	for (const i of strategiesIndex) {
		calls.push(vaultContract.withdrawalQueue(i));
	}
	const	ethcallProvider = await newEthCallProvider(getProvider(network), network);
	const	callResult = await ethcallProvider.tryAll(calls);
	return	callResult.filter((a): boolean => a !== ethers.constants.AddressZero) as string[];
}

async function fetchNames({addresses, network}: {addresses: string[], network: number}): Promise<string[]> {
	const 	calls = [];
	for (const address of addresses) {
		const	strategyContract = new Contract(
			address,
			[{'inputs':[], 'name':'name', 'outputs':[{'internalType':'string', 'name':'', 'type':'string'}], 'stateMutability':'view', 'type':'function'}]
		);
		calls.push(strategyContract.name());
	}
	const	ethcallProvider = await newEthCallProvider(getProvider(network), network);
	const	callResult = await ethcallProvider.tryAll(calls);
	return	callResult.filter((a): boolean => a !== ethers.constants.AddressZero) as string[];	
}

type TStratTree = {[key: string]: {description: string, name: string}}
type TStrategy = {
    address: string;
    name: string;
    description: string;
	noIPFS?: boolean;
}

async function getVaultStrategies({vaultAddress, network, stratTree}: {vaultAddress: string, network: number, stratTree: TStratTree}): Promise<[TStrategy[], boolean]> {
	const	vaultStrategies = await fetchStrategies({vaultAddress, network});
	const 	strategies: TStrategy[] = [];
	let		hasMissingStrategiesDescriptions = false;
	for (const vaultStrategy of vaultStrategies) {
		const	strategyAddress = toAddress(vaultStrategy);
		const	details = stratTree[strategyAddress];
		if (details) {
			if (!details?.description) {
				hasMissingStrategiesDescriptions = true;
			}
			strategies.push({
				address: strategyAddress || '',
				name: details?.name || '',
				description: (details?.description ? details.description : '')
			});	
		} else {
			strategies.push({
				address: strategyAddress || '',
				name: '',
				description: ''
			});	
			hasMissingStrategiesDescriptions = true;
		}
	}
	const	strategyWithNoName = [];
	for (const strategy of strategies) {
		if (!strategy.name) {
			strategyWithNoName.push(strategy.address);
		}
	}
	const	noNameNames = await fetchNames({addresses: strategyWithNoName, network});
	let		noNameIndex = 0;
	// eslint-disable-next-line @typescript-eslint/prefer-for-of
	for (let index = 0; index < strategies.length; index++) {
		const strategy = strategies[index];
		if (!strategy.name) {
			strategy.noIPFS = true;
			strategy.name = noNameNames[noNameIndex++];
		}
	}

	return ([strategies, hasMissingStrategiesDescriptions]);
}

async function getStrategies({network}: {network: number}): Promise<{
    address: string;
    symbol: string;
    underlying: string;
    name: string;
    display_name: string;
    icon: string;
    strategies: TStrategy[];
    hasMissingStrategiesDescriptions: boolean;
}[]> {
	const	allStrategiesAddr = await (await fetch(`${process.env.META_API_URL}/${network}/strategies/all`)).json();
	const	stratTree: TStratTree = {};
	for (const stratDetails of allStrategiesAddr) {
		for (const address of (stratDetails.addresses)) {
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name
			};
		}
	}

	const	vaults = (await (await fetch(`https://ape.tax/api/vaults?network=${network}`)).json()).data;
	const	vaultsWithStrats = [];
	const	filteredVaults = vaults.filter(e => e.status !== 'endorsed');

	await Promise.all(filteredVaults.map(async (vault): Promise<void> => {
		const	[strategies, hasMissingStrategiesDescriptions] = await getVaultStrategies({
			vaultAddress: vault.address,
			network,
			stratTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.want.symbol || '', 
			underlying: vault.want.address || '',
			name: vault.title || '', 
			display_name: vault.title || '', 
			icon: vault.logo || '',
			strategies,
			hasMissingStrategiesDescriptions
		});
	}));
	return (vaultsWithStrats);
}

const	vaultsMapping: {[key: number]: object} = {};
const	vaultsMappingAccess: {[key: string]: number} = {};
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	// eslint-disable-next-line prefer-const
	let	{network, revalidate} = req.query;
	const networkID = Number(network);

	const	now = new Date().getTime();
	const	lastAccess = vaultsMappingAccess[networkID] || 0;
	if (lastAccess === 0 || ((now - lastAccess) > 5 * 60 * 1000) || revalidate === 'true' || !vaultsMapping[networkID]) {
		const	result = await getStrategies({network: networkID});
		vaultsMapping[networkID] = result;
		vaultsMappingAccess[networkID] = now;
	}
	res.setHeader('Cache-Control', 's-maxage=6000'); // 60 minutes
	return res.status(200).json(vaultsMapping[networkID]);
}

export async function listVaultsWithStrategies({network = 1}): Promise<string> {
	const	result = await getStrategies({network: Number(network)});
	return JSON.stringify(result);
}
