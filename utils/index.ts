import	{ethers}	from	'ethers';
// import	{Provider}	from	'ethcall';

export const toAddress = (address?: string): string => {
	if (!address) {
		return ethers.constants.AddressZero;
	}
	if (address === 'GENESIS') {
		return ethers.constants.AddressZero;
	}
	try {
		return ethers.utils.getAddress(address);	
	} catch (error) {
		return ethers.constants.AddressZero;
	}
};

export function truncateHex(address: string, size: number): string {
	if (address !== undefined) {
		return `${address.slice(0, size)}...${address.slice(-size)}`;
	}
	return '0x000...0000';
}

export function	parseMarkdown(markdownText: string): string {
	const htmlText = markdownText
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='hover:underline cursor-pointer text-yearn-blue' target='_blank' href='$2'>$1</a>")
		.replace(/~~(.*?)~~/gim, "<span class='text-yblue'>$1</span>")
		.replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>")
		;

	return htmlText.trim();
}

export function	parseMarkdownUnset(markdownText: string): string {
	const htmlText = markdownText
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='underline cursor-pointer' target='_blank' href='$2'>$1</a>")
		.replace(/~~(.*?)~~/gim, '<span>$1</span>')
		.replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>")
		;

	return htmlText.trim();
}

// export const isObjectEmpty = (obj: any): boolean => !obj || JSON.stringify(obj) === '{}';

// export const sum = (...args: any[]) => [...args, 0].reduce((a, b) => a + b);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const sortByKey = (arr: any[], k: string | number, order = 1) => arr.concat().sort((a, b) => (a[k] > b[k]) ? order : ((a[k] < b[k]) ? -order : 0));

export function	formatAmount(amount: number | bigint, decimals = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined')
		locale = navigator?.language || 'fr-FR';
	return (new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits: 0, maximumFractionDigits: decimals}).format(amount));
}
export function	formatDate(value: number | Date | undefined, withDate = true): string {
	if (withDate)
		return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', timeStyle: 'short', hourCycle: 'h24'}).format(value));
	return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', hourCycle: 'h24'}).format(value));
}

// export async function newEthCallProvider(provider: Provider): Promise<Provider> {
// 	const	ethcallProvider = new Provider();
// 	if (process.env.IS_TEST) {
// 		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
// 		if (Number(process.env.TESTED_NETWORK) === 250) {
// 			ethcallProvider.multicall = {address: '0xc04d660976c923ddba750341fe5923e47900cf24', block: 0};
// 			ethcallProvider.multicall2 = {address: '0x470ADB45f5a9ac3550bcFFaD9D990Bf7e2e941c9', block: 0};
// 		} else {
// 			ethcallProvider.multicall = {address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441', block: 0};
// 			ethcallProvider.multicall2 = {address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696', block: 0};
// 		}

// 		return ethcallProvider;
// 	}
// 	await	ethcallProvider.init(provider);
// 	return	ethcallProvider;
// }