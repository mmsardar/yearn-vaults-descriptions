import	React				from	'react';
import	{useRouter}			from	'next/router';
import	Link				from	'next/link';
import	useLocalization		from	'contexts/useLocalization';
import	useUI				from	'contexts/useUI';
import	IconYearnFilled		from	'components/icons/IconYearnFilled';
import	IconHamburger		from	'components/icons/IconHamburger';
import	LOCALES				from	'utils/locale';

type TMenuItem = {label: string, condition: boolean, href: string, hideIf?: boolean, className?: string, height?: string}
function	MenuItem({label, condition, href, hideIf, className, height = 'h-6'}: TMenuItem): (React.ReactElement | null) {
	if (hideIf) {
		return null;
	}
	return (
		<Link href={href}>
			<div className={`${condition ? 'font-bold text-yearn-blue dark:text-white' : 'text-gray-blue-1 dark:text-gray-3'} relative w-full cursor-pointer ${className}`}>
				{label}
				<div className={'absolute top-0 z-20 hidden md:block'} style={{right: -3}}>
					<div className={`${height} rounded-sm bg-yearn-blue dark:bg-white ${condition ? 'opacity-100' : 'opacity-0'}`} style={{width: 5}} />
				</div>
			</div>
		</Link>
	);
}

function	MenuItems(): React.ReactElement {
	const	router = useRouter();
	const	{common} = useLocalization();
	return (
		<div className={'w-full'}>
			<MenuItem
				className={'mb-4'}
				label={common['menu-overview']}
				condition={router.pathname === '/'}
				href={'/'} />
			<MenuItem
				className={'mb-4'}
				label={common['menu-yearn-curve']}
				condition={router.pathname === '/yearn-and-curve'}
				href={'/yearn-and-curve'} />
			<div className={'mb-6 ml-4 space-y-2 md:mb-8 md:space-y-4'}>
				<MenuItem
					className={'mb-4 md:mb-8'}
					label={common['menu-curve-boost-multiplier']}
					condition={router.pathname === '/curve-boost-multipliers'}
					href={'/curve-boost-multipliers'} />
			</div>

			<p className={'mb-2 text-gray-blue-2 dark:text-gray-3/60 md:mb-4'}>{'Ethereum'}</p>
			<div className={'mb-6 ml-4 space-y-2 md:mb-8 md:space-y-4'}>
				<MenuItem
					label={common['menu-stables']}
					condition={router.pathname === '/ethereum/stables'}
					href={'/ethereum/stables'} />
				<MenuItem
					label={common['menu-defi-tokens']}
					condition={router.pathname === '/ethereum/defi-tokens'}
					href={'/ethereum/defi-tokens'} />
				<MenuItem
					label={common['menu-curve-pools']}
					condition={router.pathname === '/ethereum/curve-pools'}
					href={'/ethereum/curve-pools'} />

				<MenuItem
					label={common['menu-experimental']}
					hideIf={router.pathname !== '/ethereum/experimental-vaults'}
					condition={router.pathname === '/ethereum/experimental-vaults'}
					href={'/ethereum/experimental-vaults'} />

				<MenuItem
					label={common['menu-retired-vaults']}
					condition={router.pathname === '/ethereum/retired-vaults'}
					href={'/ethereum/retired-vaults'} />
				<div className={'mb-4 ml-4 space-y-2 md:mb-8 md:space-y-4'}>
					<MenuItem
						label={common['menu-v1-vaults']}
						condition={router.pathname === '/ethereum/v1-vaults'}
						href={'/ethereum/v1-vaults'} />
				</div>
			</div>
		
			<p className={'mb-2 text-gray-blue-2 dark:text-gray-3/60 md:mb-4'}>{'Fantom'}</p>
			<div className={'mb-6 ml-4 space-y-2 md:mb-8 md:space-y-4'}>
				<MenuItem
					label={common['menu-stables']}
					condition={router.pathname === '/fantom/stables'}
					href={'/fantom/stables'} />
				<MenuItem
					label={common['menu-defi-tokens']}
					condition={router.pathname === '/fantom/defi-tokens'}
					href={'/fantom/defi-tokens'} />
				<MenuItem
					label={common['menu-curve-pools']}
					condition={router.pathname === '/fantom/curve-pools'}
					href={'/fantom/curve-pools'} />
				<MenuItem
					label={common['menu-experimental']}
					hideIf={router.pathname !== '/fantom/experimental-vaults'}
					condition={router.pathname === '/fantom/experimental-vaults'}
					href={'/fantom/experimental-vaults'} />
				<MenuItem
					label={common['menu-retired-vaults']}
					condition={router.pathname === '/fantom/retired-vaults'}
					href={'/fantom/retired-vaults'} />
			</div>
		

		</div>
	);
}

function	MenuMobile(): React.ReactElement {
	const	{common, language, set_language} = useLocalization();
	const	{theme, switchTheme} = useUI();
	const	router = useRouter();
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);
	
	function	onExpand(): void {
		if (isExpanded) {
			set_isExpandedAnimation(false);
			setTimeout((): void => set_isExpanded(false), 500);
		} else {
			set_isExpanded(true);
			setTimeout((): void => set_isExpandedAnimation(true), 1);
		}
	}

	React.useEffect((): void => {
		set_isExpandedAnimation(false);
		setTimeout((): void => set_isExpanded(false), 500);
	}, [router.asPath]);

	return (
		<nav className={'fixed top-0 z-50 block h-16 w-full bg-white p-4 shadow dark:bg-black-1 md:hidden'}>
			<div className={'relative z-20 h-full w-full'}>
				<div className={'relative flex h-full w-full flex-col'}>
					<div className={'flex flex-row items-center justify-between'}>
						<Link href={'/'}>
							<div className={'flex flex-row items-start'}>
								<IconYearnFilled />
								<h1 className={'pl-1.5 text-lg font-bold text-dark-blue-1 dark:text-white'} style={{paddingTop: 1}}>{` ${common.title}`}</h1>
							</div>
						</Link>
						<IconHamburger className={'block h-6 w-6 text-yearn-blue dark:text-white'} onClick={onExpand} />
					</div>
				</div>
			</div>
			<div className={`transition-max-height fixed inset-x-0 top-14 w-full overflow-hidden bg-white duration-500 dark:bg-black-1 ${isExpandedAnimation ? 'max-h-max border-b border-b-gray-2 shadow' : 'max-h-0'}`}>
				{isExpanded ? (
					<div className={'relative p-4'}>
						<MenuItems />
						<div className={'mt-8 flex flex-row items-center'}>
							<select
								value={language}
								className={'m-0 mr-1 flex cursor-pointer items-center whitespace-nowrap rounded-sm border-none bg-white py-2 px-3 pr-7 text-xs font-semibold text-dark-blue-1 dark:bg-black dark:text-white'}
								onChange={(e): void => {
									router.push(router.asPath, router.asPath, {locale: e.target.value});
									set_language(e.target.value);
								}}>
								{Object.values(LOCALES).map((lang, index): React.ReactElement => (
									<option className={'cursor-pointer'} key={index} value={lang.code}>{lang.name}</option>
								))}
							</select>
						</div>
						<div className={'absolute top-4 right-4'}>
							<svg
								onClick={switchTheme}
								className={`text-ygray-100 h-4 w-4 cursor-pointer opacity-20 transition-opacity hover:opacity-100 dark:text-white ${theme === 'dark' ? 'hidden' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'}></path></svg>

							<svg
								onClick={switchTheme}
								className={`text-ygray-100 h-4 w-4 cursor-pointer opacity-20 transition-opacity hover:opacity-100 dark:text-white ${theme === 'dark' ? '' : 'hidden'}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z'}></path></svg>
						</div>
					</div>
				) : <div />}
			</div>
		</nav>
	);
}

function	MenuDesktop(): React.ReactElement {
	const	{common, language, set_language} = useLocalization();
	const	{theme, switchTheme} = useUI();
	const	router = useRouter();
	const	head = React.useRef<HTMLSpanElement>(null);
	
	React.useEffect((): void => {
		if (head?.current) {
			head.current.oncontextmenu = (event): void => {
				if (event.button === 2) {
					event.preventDefault();
					router.push('/internal/missing-descriptions');
				}
			};
		}
	}, [router]);

	return (
		<nav className={'sticky top-0 z-50 hidden h-screen w-full border-r border-gray-blue-3 px-0 pt-12 shadow-none dark:border-gray-2 md:block'}>
			<div className={'relative z-20 h-full w-full'}>
				<div className={'relative flex h-full w-full flex-col'}>
					<div className={'flex flex-row items-center justify-between'}>
						<Link href={'/'}>
							<span ref={head} className={'flex cursor-pointer flex-row items-start'}>
								<IconYearnFilled />
								<h1 className={'pl-1.5 text-lg font-bold text-dark-blue-1 dark:text-white'} style={{paddingTop: 1}}>{` ${common.title}`}</h1>
							</span>
						</Link>
					</div>
					<div className={'pt-12'}>
						<MenuItems />
					</div>
					<div className={'mt-auto mb-7 flex flex-row items-center justify-between'}>
						<div className={'flex flex-row items-center space-x-4'}>
							<select
								value={language}
								className={'button-light m-0 mr-1 flex cursor-pointer items-center whitespace-nowrap rounded-sm border-none py-2 px-3 pr-7 text-xs font-semibold'}
								onChange={(e): void => {
									router.push(router.asPath, router.asPath, {locale: e.target.value});
									set_language(e.target.value);
								}}>
								{Object.values(LOCALES).map((lang, index): React.ReactElement => (
									<option className={'cursor-pointer'} key={index} value={lang.code}>{lang.name}</option>
								))}
							</select>
						</div>
						<div className={'mr-8 flex flex-row items-center space-x-4'}>
							<svg
								onClick={switchTheme}
								className={`text-ygray-100 h-4 w-4 cursor-pointer opacity-20 transition-opacity hover:opacity-100 dark:text-white ${theme === 'dark' ? 'hidden' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'}></path></svg>

							<svg
								onClick={switchTheme}
								className={`text-ygray-100 h-4 w-4 cursor-pointer opacity-20 transition-opacity hover:opacity-100 dark:text-white ${theme === 'dark' ? '' : 'hidden'}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z'}></path></svg>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export {MenuDesktop, MenuMobile};