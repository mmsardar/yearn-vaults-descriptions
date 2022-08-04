import	React, {ReactElement}		from	'react';
import	Head						from	'next/head';
import	{AppProps}					from	'next/app';
import	{WithYearn}					from	'@yearn-finance/web-lib/contexts';
import	{DefaultSeo}				from	'next-seo';
import	{NetworkContextApp}			from	'contexts/useNetwork';
import	{UIContextApp}				from	'contexts/useUI';
import	{LocalizationContextApp}	from 'contexts/useLocalization';
import	{MenuDesktop, MenuMobile}	from	'components/Menu';
import	Footer						from	'components/StandardFooter';

import	'style/Default.css';

function	WithLayout(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<MenuMobile />
			<div id={'app'} className={'relative mx-auto mb-0 flex w-full max-w-6xl flex-col'}>
				<div className={'grid grid-cols-15 gap-x-4'}>
					<div className={'hidden md:col-span-3 md:block'}>
						<MenuDesktop />
					</div>
					<main className={'col-span-15 flex min-h-full flex-col pt-20 md:col-span-12 md:pt-12'}>
						<Component
							key={router.route}
							router={router}
							{...pageProps} />
						<div className={'static bottom-0 mt-auto grid grid-cols-12'}>
							<div className={'col-span-12'}>
								<Footer />
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	WEBSITE_URI = process.env.WEBSITE_URI;

	return (
		<>
			<Head>
				<title>{'Strategies Registry'}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />

				<link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
				<link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={'true'} />
				<link href={'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'} rel={'stylesheet'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
			</Head>
			<DefaultSeo
				title={process.env.WEBSITE_NAME}
				defaultTitle={process.env.WEBSITE_NAME}
				description={process.env.WEBSITE_DESCRIPTION}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
			<WithLayout {...props} />
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn>
			<UIContextApp>
				<LocalizationContextApp router={props.router}>
					<NetworkContextApp>
						<AppWrapper
							Component={Component}
							pageProps={pageProps}
							// element={props.element}
							router={props.router} />
					</NetworkContextApp>
				</LocalizationContextApp>
			</UIContextApp>
		</WithYearn>
	);
}

export default MyApp;
