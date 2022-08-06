import {toAddress} from 'utils';
import type {NextApiRequest, NextApiResponse} from 'next';
import type {TVault} from './strategies';


type TVaultTree = {
	[key: string]: boolean;
};
type TTokenTree = {
	[key: string]: TTokenDetails;
};
type TTokenDetails = {
	tokenNameOverride?: string;
	tokenSymbolOverride?: string;
	description?: string;
	address?: string;
	name?: string;
	symbol?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function getVaultStrategies({vaultAddress, wantAddress, wantName, tokenTree, vaultTree}: {vaultAddress: string, wantAddress?: string, wantName?: string, tokenTree: TTokenTree, vaultTree: TVaultTree}) {
	const	vaultTokenAddress = toAddress(vaultAddress);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const	vaultTokenHasIPFSFile = vaultTree[vaultTokenAddress];

	const	wantTokenAddress = toAddress(wantAddress);
	const	wantTokenName = tokenTree[wantTokenAddress]?.tokenNameOverride || wantName;
	const	wantTokenDescription = tokenTree[wantTokenAddress]?.description || '';
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const	wantTokenHasIPFSFile = tokenTree[wantTokenAddress] ? true : false;

	return ([[
		{ipfs: vaultTokenHasIPFSFile},
		{address: wantTokenAddress, name: wantTokenName, description: wantTokenDescription, ipfs: wantTokenHasIPFSFile}
	], !vaultTokenHasIPFSFile || !wantTokenHasIPFSFile]);
}

async function getTokens({network}: {network: number}): Promise<object[]> {
	const	vaultDataFromIPFS = await (await fetch(`${process.env.META_API_URL}/${network}/vaults/all`)).json();
	const	dataFromIPFS: TTokenDetails[] = await (await fetch(`${process.env.META_API_URL}/${network}/tokens/all`)).json();
	const	tokenTree: TTokenTree = {};
	const	vaultTree: TVaultTree = {};

	for (const tokenDetails of dataFromIPFS) {
		const address = tokenDetails.address;
		tokenTree[toAddress(address)] = {
			description: tokenDetails.description || '',
			name: tokenDetails?.tokenNameOverride || '',
			symbol: tokenDetails?.tokenSymbolOverride || ''
		};
	}

	for (const vaultDetails of vaultDataFromIPFS) {
		const address = vaultDetails.address;
		vaultTree[toAddress(address)] = true;
	}


	let		vaults: TVault[] = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	vaults = vaults.filter((e): boolean => !e.migration || !e.migration?.available);
	vaults = vaults.filter((e): boolean => e.type !== 'v1');
	const	vaultsWithStrats = [];

	for (const vault of vaults) {
		const	[tokens, hasMissingTokenInfo] = await getVaultStrategies({
			vaultAddress: vault.address,
			wantAddress: vault?.token?.address,
			wantName: vault?.token?.name,
			tokenTree,
			vaultTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.token.symbol || '', 
			name: vault.name || '', 
			display_name: vault.display_name || '', 
			icon: vault.icon || '',
			tokens,
			hasMissingTokenInfo
		});
	}
	return (vaultsWithStrats);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const	{network} = req.query;
	const result = await getTokens({network: Number(network)});
	return res.status(200).json(result);
}

export async function listVaultsWithTokens({network = 1}): Promise<string> {
	const	result = await getTokens({network: Number(network)});
	return JSON.stringify(result);
}