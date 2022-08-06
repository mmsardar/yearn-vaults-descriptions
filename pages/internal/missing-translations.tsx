import	React							from	'react';
import	Navbar							from	'components/Navbar';
import	HeadIconCogs					from	'components/icons/HeadIconCogs';
import	useNetwork						from	'contexts/useNetwork';
import	IconChevron						from	'components/icons/IconChevron';
import	IconLinkOut						from	'components/icons/IconLinkOut';
import	{filterProtocolsWithMissingTranslations, listProtocols} from 'pages/api/protocols';
import	LOCALES							from	'utils/locale';

const META_GH_PROTOCOL_URI = `${process.env.META_GITHUB_URL}/tree/master/data/protocols`;

function Protocol({name, filename, description, missingTranslationsLocales, localeFilter, localization}): JSX.Element {
	const	{currentChainId} = useNetwork();
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);

	const missingTranslationCounts = React.useMemo(() => {
		return localeFilter ? 1 : missingTranslationsLocales.length;
	}, [missingTranslationsLocales, localeFilter]);

	function	onExpand(): void {
		if (isExpanded) {
			set_isExpandedAnimation(false);
			setTimeout((): void => set_isExpanded(false), 500);
		} else {
			set_isExpanded(true);
			setTimeout((): void => set_isExpandedAnimation(true), 1);
		}
	}

	return (
		<div
			className={`w-full max-w-4xl ${isExpanded ? 'bg-white-blue-1 dark:bg-black' : 'bg-white-blue-2 hover:bg-white-blue-1 dark:bg-black-1'} mb-0.5 rounded-sm p-4 transition-colors`}>
			<div className={'group flex cursor-pointer flex-row items-center'} onClick={onExpand}>
				<p className={'mr-2 break-words text-dark-blue-1 dark:text-white'}>
					<b className={'font-bold'}>{name}</b>
				</p>
				{
					!localization ? (
						<span className={'ml-2 rounded-md bg-yearn-blue py-1 px-2 text-xs font-bold text-white dark:text-gray-3'}>
							{'No localization data is found'}
						</span>
					) : (
						<span className={'ml-2 rounded-md bg-yearn-blue py-1 px-2 text-xs font-bold text-white dark:text-gray-3'}>
							{`Missing ${missingTranslationCounts} ${missingTranslationCounts > 1 ? 'translations' : 'translation'}`}
						</span>
					)
				}
				<div className={'mr-1 ml-auto flex flex-row justify-center'}>
					<a
						onClick={e => e.stopPropagation()}
						target={'_blank'}
						href={`${META_GH_PROTOCOL_URI}/${currentChainId}/${filename}.json`}
						rel={'noreferrer'}>
						<IconLinkOut className={'mr-4 h-4 w-4 text-yearn-blue'} />
					</a>
					<IconChevron className={isExpandedAnimation ? 'h-4 w-4 -rotate-90 text-gray-blue-1 transition-transform dark:text-gray-3' : 'h-4 w-4 -rotate-180 text-gray-blue-1 transition-transform dark:text-gray-3'} />
				</div>
			</div>
			<div className={`transition-max-height w-full overflow-hidden duration-500 ${isExpandedAnimation ? 'max-h-max' : 'max-h-0'}`}>
				{isExpanded ? (
					<div className={'mt-4 space-y-2 dark:text-gray-3'}>
						<p>{description}</p>
						{(!localeFilter || localeFilter === 'en') && <p className={'text-xs'}>{`Missing translations for ${missingTranslationsLocales.map(data => data.name).join(', ')}`}</p>}
					</div>
				) : <div />}
			</div>
		</div>
	);	
}

function	Index({protocolsList}): JSX.Element {
	const	[protocols, set_protocols] = React.useState(protocolsList ?? []);
	const	[localeFilter, set_localeFilter] = React.useState('');
	const	[isFetchingData, set_isFetchingData] = React.useState(false);
	const	{currentNetwork} = useNetwork();

	async function	refetchData(_currentNetwork: number): Promise<void> {
		set_isFetchingData(true);
		const _data = await listProtocols(_currentNetwork);
		set_protocols(_data);

		set_isFetchingData(false);
	}

	function getNetworkInfo(network: string): 1 | 250 | 42161 {
		switch (network){
		case 'Fantom' : 
			return 250;
		case 'Arbitrum' : 
			return 42161;
		case 'Ethereum':
		default: 
			return 1;
		}
	}

	const protocolsWithMissingTranslations = React.useMemo(() => {
		return filterProtocolsWithMissingTranslations(protocols, localeFilter);
	}, [protocols, localeFilter]);

	React.useEffect((): void => {
		refetchData(getNetworkInfo(currentNetwork));
	}, [currentNetwork]);

	return (
		<section className={'w-full rounded-sm bg-white p-4 dark:bg-black'}>
			<Navbar />
			<div>
				<div className={'w-full max-w-5xl'}>
					<div className={'flex flex-col'}>
						<div className={'mb-8'}>
							<HeadIconCogs className={'text-yearn-blue dark:text-white'} />
						</div>
						<div className={'w-full'}>
							<div className={'flex flex-col'}>
								<div className={'mb-8 flex w-full flex-row items-center'}>
									<h1 className={'whitespace-pre-line text-4xl font-bold text-dark-blue-1 dark:text-white md:text-6xl'}>
										{'Translations'}
									</h1>
									<div
										className={'-m-2 ml-2 p-2'}
										style={{marginTop: -2}}
										onClick={async (): Promise<void> => refetchData(getNetworkInfo(currentNetwork))}>
										<svg aria-hidden={'true'} className={`text-ygray-300 dark:text-dark-50 h-4 w-4 cursor-pointer opacity-30 transition-opacity hover:opacity-100 ${isFetchingData ? 'animate animate-spin' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z'}></path></svg>
									</div>
								</div>
								<div className={'mb-8 text-gray-blue-1 dark:text-gray-3'}>
									{`List of protocols with no translations or missing translations. (Found ${protocolsWithMissingTranslations.length})`}
								</div>
								<div className={'flex flex-row items-center space-x-4'}>
									<p className={'font-bold dark:text-gray-3'}>{'Filter by locale'}</p>
									<select
										value={localeFilter}
										onChange={(e): void => set_localeFilter(e.target.value)}
										className={'button-light m-0 mr-1 flex w-24 cursor-pointer items-center whitespace-nowrap rounded-sm border-none py-2 px-3 pr-7 text-xs font-semibold'}
									>
										<option className={'cursor-pointer'} value={''}>{'All'}</option>
										{Object.entries(LOCALES).map(([locale, localeData], index): JSX.Element => (
											<option className={'cursor-pointer'} key={index} value={locale}>{localeData.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className={'mt-4 w-full'}>
						{protocolsWithMissingTranslations.map((protocol): JSX.Element => <Protocol key={protocol.name} localeFilter={localeFilter} {...protocol} />)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
