import axios from 'axios';
import LOCALES, {TLocaleProps} from 'utils/locale';

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
type TProtocol = {
	'$schema': string;
	name: string;
	description: string;
	localization: {
		[key: string]: {
			name: string;
			description: string;
		}
	}
}
export type TListProtocol = TProtocol & {filename: string}

export async function listProtocols(chainId: number): Promise<TListProtocol[]> {
	const protocolApiUrl = `${process.env.META_API_URL}/${chainId}/protocols`;
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const protocols: TProtocol[] = await axios.get(`${protocolApiUrl}/all`, {params: {loc: 'all'}}).then(res => res.data.files);

	if (!(protocols instanceof Array)) {
		console.warn('protocolFilenames is not an array.');
		return [];
	}

	return protocols.map((protocol): TListProtocol => { 
		return {...protocol, filename: protocol.name.trim()};
	});
}

/**
 * Return protocols with no or missing translations
 * 
 * A "missingTranslationsLocales" field will be added for each protocol with missing translations
 */
export function filterProtocolsWithMissingTranslations(protocols: TListProtocol[] = [], localeFilter = ''): (TListProtocol & {missingTranslationsLocales: TLocaleProps[]})[] {
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
function findProtocolMissingTranslations(protocol: TListProtocol): TLocaleProps[] {
	const missingTranslations: TLocaleProps[] = [];
	const englishDescription = protocol.description;

	for (const [locale, translation] of Object.entries(protocol.localization ?? {})) {
		if (!translation.description || (locale != 'en' && englishDescription === translation.description)) {
			missingTranslations.push(LOCALES[locale]);
		}
	}

	return missingTranslations;
}
