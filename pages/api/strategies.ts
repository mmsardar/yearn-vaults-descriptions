import {toAddress} from 'utils';

async function getVaultStrategies({vaultStrategies, stratTree}): Promise<[{
    address: string;
    name: string;
    description: string;
    localization: object;
}[], boolean]> {
	const 	strategies = [];
	let		hasMissingStrategiesDescriptions = false;
	for (const vaultStrategy of vaultStrategies) {
		const	strategyAddress = toAddress(vaultStrategy.address);
		const	strategyName = vaultStrategy.name;
		const	details = stratTree[strategyAddress];
		if (details) {
			if (!details?.description) {
				hasMissingStrategiesDescriptions = true;
			}
			strategies.push({
				address: strategyAddress || '',
				name: details?.name || strategyName || '',
				description: (details?.description ? details.description : ''),
				localization: (details?.localization ? details.localization : {})
			});	
		} else {
			strategies.push({
				address: strategyAddress || '',
				name: strategyName || '',
				description: '',
				localization: {}
			});	
			hasMissingStrategiesDescriptions = true;
		}
	}
	return ([strategies, hasMissingStrategiesDescriptions]);
}

async function getStrategies({network}) {
	const	allStrategiesAddr = await (await fetch(`${process.env.META_API_URL}/${network}/strategies/all`)).json();
	const	stratTree = {};

	for (const stratDetails of allStrategiesAddr) {
		for (const address of (stratDetails.addresses)) {
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name,
				localization: stratDetails.localization
			};
		}
	}

	let		vaults = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	vaults = vaults.filter(e => !e.migration || !e.migration?.available);
	vaults = vaults.filter(e => e.type !== 'v1');
	const	vaultsWithStrats = [];

	for (const vault of vaults) {
		const	[strategies, hasMissingStrategiesDescriptions] = await getVaultStrategies({
			vaultStrategies: vault.strategies,
			stratTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.token.symbol || '', 
			name: vault.name || '', 
			display_name: vault.display_name || '', 
			icon: vault.icon || '',
			strategies,
			hasMissingStrategiesDescriptions
		});
	}
	return (vaultsWithStrats);
}

import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const	{network} = req.query;
	const	result = await getStrategies({network: Number(network)});
	return res.status(200).json(result);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function listVaultsWithStrategies({network = 1}) {
	const	result = await getStrategies({network: Number(network)});
	return JSON.stringify(result);
}