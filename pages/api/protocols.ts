import axios from 'axios';
import LOCALES from 'utils/locale';

/**
 * Return all protocols of that network
 * 
 * Example protocol data:
 * 
 * {
 *   "$schema": "protocol",
 *   "name": "0xDAO",
 *   "description": "0xDAO is a protocol that is pooling money to distribute a Solidly NFT's token emissions via their governance token OXD.",
 *   "localization": {
 *    "en": {
 *      "name": "0xDAO",
 *      "description": "0xDAO is a protocol that is pooling money to distribute a Solidly NFT's token emissions via their governance token OXD."
 *    },
 *    ...
 *    }
 * }
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function listProtocols(chainId: number) {
	const protocolApiUrl = `${process.env.META_API_URL}/${chainId}/protocols`;
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const protocolFilenames: string[] = await axios.get(`${protocolApiUrl}/index`).then(res => res.data.files);

	if (!(protocolFilenames instanceof Array)) {
		console.warn('protocolFilenames is not an array.');
		return [];
	}

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const protocolPromises = protocolFilenames.map(async (name) => {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		return  axios.get(`${protocolApiUrl}/${name}`).then(async (res) => {
			return {
				...res.data,
				filename: name
			};
		});
	});

	return Promise.all(protocolPromises);
}

/**
 * Return protocols with no or missing translations
 * 
 * A "missingTranslationsLocales" field will be added for each protocol with missing translations
 */
export function filterProtocolsWithMissingTranslations(protocols: object[] = [], localeFilter = '') {
	if (!(protocols instanceof Array)) {
		console.warn('protocols is not an array.');
		return [];
	}
  
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return protocols.map(protocol => {
		const missingTranslationsLocales = findProtocolMissingTranslations(protocol);

		return {
			...protocol,
			missingTranslationsLocales
		};
	}).filter((protocol): boolean => {
		if (localeFilter) {
			return protocol.missingTranslationsLocales.some((localeData): boolean => localeData.code.toLowerCase() === localeFilter.toLowerCase());
		}

		return protocol.missingTranslationsLocales.length > 0;
	});
}
type TMissingTranslation = {
	code: string;
	name: string;
	symbol: string;
};
function findProtocolMissingTranslations(protocol): TMissingTranslation[] {
	const missingTranslations: TMissingTranslation[] = [];
	const englishDescription = protocol.description;

	for (const [locale, translation] of Object.entries(protocol.localization ?? {})) {
		if (!translation.description || (locale != 'en' && englishDescription === translation.description)) {
			missingTranslations.push(LOCALES[locale]);
		}
	}

	return missingTranslations;
}
