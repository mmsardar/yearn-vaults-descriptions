import {toAddress} from 'utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function getVaultStrategies({vaultAddress, wantAddress, wantName, tokenTree, vaultTree}) {
	const	vaultTokenAddress = toAddress(vaultAddress);
	const	vaultTokenHasIPFSFile = vaultTree[vaultTokenAddress];

	const	wantTokenAddress = toAddress(wantAddress);
	const	wantTokenName = tokenTree[wantTokenAddress]?.tokenNameOverride || wantName;
	const	wantTokenDescription = tokenTree[wantTokenAddress]?.description || '';
	const	wantTokenHasIPFSFile = tokenTree[wantTokenAddress] ? true : false;

	return ([[
		{ipfs: vaultTokenHasIPFSFile},
		{address: wantTokenAddress, name: wantTokenName, description: wantTokenDescription, ipfs: wantTokenHasIPFSFile},
	], !vaultTokenHasIPFSFile || !wantTokenHasIPFSFile]);
}

async function getTokens({network}) {
	const	vaultDataFromIPFS = await (await fetch(`${process.env.META_API_URL}/${network}/vaults/all`)).json();
	const	dataFromIPFS = await (await fetch(`${process.env.META_API_URL}/${network}/tokens/all`)).json();
	const	tokenTree = {};
	const	vaultTree = {};

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


	let		vaults = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	vaults = vaults.filter(e => !e.migration || !e.migration?.available);
	vaults = vaults.filter(e => e.type !== 'v1');
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

import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const	{network} = req.query;
	const result = await getTokens({network: Number(network)});
	return res.status(200).json(result);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function listVaultsWithTokens({network = 1}) {
	const	result = await getTokens({network: Number(network)});
	return JSON.stringify(result);
}