import	React, {useContext, createContext}	from	'react';
import {Router} from 'next/router';

type TLocalizationContext = {
	common: {[key: string]: string},
	language: string;
	set_language: ((language: string) => void);
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const	Localization = createContext<TLocalizationContext>({common:{}, language:'en', set_language: (_l): void => void 0});

function	getCommons(language: string): {[key: string]: string} {
	try {
		const	_common = require(`/localization/${language}.json`);
		const	_commonFallback = require('/localization/en.json');
		const	_commonWithFallback = Object.assign({..._commonFallback}, {..._common});
		return (_commonWithFallback);
	} catch (e) {
		const	_common = require('/localization/en.json');
		return (_common);
	}
}

export const LocalizationContextApp = ({children, router}: {children: React.ReactNode, router: Router}): React.ReactElement => {
	const	[language, set_language] = React.useState(router.locale || 'en');
	const	[common, set_common] = React.useState(getCommons(router.locale || 'en'));

	React.useEffect((): void => {
		set_common(getCommons(language));
	}, [language]);

	return (
		<Localization.Provider
			value={{
				common,
				language,
				set_language
			}}>
			{children}
		</Localization.Provider>
	);
};

export const useLocalization = (): TLocalizationContext => useContext(Localization);
export default useLocalization;
