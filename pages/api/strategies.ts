import {toAddress} from 'utils';
import type {NextApiRequest, NextApiResponse} from 'next';

export type TStratTree = {[key: string]: {name: string, description: string, localization?: TLocalization}}
type TLocalization = {
	[key: string]: {
		name: string;
		description: string;
	};
};

export type TStrategy = {
	name: string;
	address: string;
	icon?: string;
	description?: string;
	localization?: TLocalization;
	strategies?: object[];
	noIPFS?: boolean;
 }

export type TVaultsWithStrat = TVault & {
    strategies: TStrategy[];
    hasMissingStrategiesDescriptions?: boolean;
}
export type TVault = {
    address: string;
    name?: string;
    logo?: string;
    title?: string;
    display_name?: string;
	underlying?: string;
    icon?: string;
    strategies: TStrategy[];
    migration?: {available?: boolean};
    apy?: {type?: string; composite?: {boost?: boolean}};
	token?: {symbol?: string; name?: string; address?: string;}
	want?: {symbol?: string; name?: string; address?: string;}
    type?: string;
    symbol?: string;
    status?: string;
    special?: boolean;
	hasBoost?: boolean;
}


async function getVaultStrategies({vaultStrategies, stratTree}: {vaultStrategies: TStrategy[], stratTree: TStratTree}): Promise<[TStrategy[], boolean]> {
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

async function getStrategies({network}: {network: number}): Promise<TVaultsWithStrat[]> {
	const	allStrategiesAddr = await (await fetch(`${process.env.META_API_URL}/${network}/strategies/all`)).json();
	const	stratTree: TStratTree = {};

	for (const stratDetails of allStrategiesAddr) {
		for (const address of (stratDetails.addresses)) {
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name,
				localization: stratDetails.localization
			};
		}
	}

	let		vaults: TVault[] = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	vaults = vaults.filter((e): boolean => !e.migration || !e.migration?.available);
	vaults = vaults.filter((e): boolean => e.type !== 'v1');
	const	vaultsWithStrats: TVaultsWithStrat[] = [];

	for (const vault of vaults) {
		const	[strategies, hasMissingStrategiesDescriptions] = await getVaultStrategies({
			vaultStrategies: vault.strategies,
			stratTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.token?.symbol || '', 
			name: vault.name || '', 
			display_name: vault.display_name || '', 
			icon: vault.icon || '',
			strategies,
			hasMissingStrategiesDescriptions
		});
	}
	return (vaultsWithStrats);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const	{network} = req.query;
	const	result = await getStrategies({network: Number(network)});
	return res.status(200).json(result);
}

export async function listVaultsWithStrategies({network = 1}): Promise<string> {
	const	result = await getStrategies({network: Number(network)});
	return JSON.stringify(result);
}