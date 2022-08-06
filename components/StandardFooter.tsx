import	React						from	'react';
import	Link						from	'next/link';
import	IconTwitter					from	'components/icons/IconTwitter';
import	IconGithub					from	'components/icons/IconGithub';
import	IconDiscord					from	'components/icons/IconDiscord';
import	IconYearnFooter				from	'components/icons/IconYearnFooter';
import	useLocalization			from	'contexts/useLocalization';

function	Footer(): React.ReactElement {
	const	{common} = useLocalization();
	return (
		<footer className={'mx-auto hidden w-full max-w-6xl flex-row items-center bg-white-blue-1 py-8 dark:bg-black-1 md:flex'}>
			<Link href={'/disclaimer'}>
				<p className={'link pr-6 text-gray-blue-1 dark:text-gray-3'}>{'Disclaimer'}</p>
			</Link>
			<a href={'https://contribute.yearn.rocks'} target={'_blank'} className={'link pr-6 text-gray-blue-1 dark:text-gray-3'} rel={'noreferrer'}>
				{common['footer-contribute']}
			</a>
			<a href={'https://yearnfinance.notion.site'} target={'_blank'} className={'link pr-6 text-gray-blue-1 dark:text-gray-3'} rel={'noreferrer'}>
				{common['footer-join']}
			</a>
			<a href={'https://yearn.watch'} target={'_blank'} className={'link pr-6 text-gray-blue-1 dark:text-gray-3'} rel={'noreferrer'}>
				{common['footer-watch']}
			</a>
			<a href={'https://api.yearn.finance/v1/chains/1/vaults/all'} target={'_blank'} className={'link pr-6 text-gray-blue-1 dark:text-gray-3'} rel={'noreferrer'}>
				{common['footer-vault-api']}
			</a>
			<div className={'link ml-auto px-3 text-gray-blue-1 dark:text-gray-3'}>
				<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'}><IconTwitter /></a>
			</div>
			<div className={'link px-3 text-gray-blue-1 dark:text-gray-3'}>
				<a href={process.env.PROJECT_GITHUB_URL} target={'_blank'} rel={'noreferrer'}><IconGithub /></a>
			</div>
			<div className={'link px-3 text-gray-blue-1 dark:text-gray-3'}>
				<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'}><IconDiscord /></a>
			</div>
			<div className={'link pl-3 text-gray-blue-1 dark:text-gray-3'}>
				<a href={'https://yearn.finance'} target={'_blank'} rel={'noreferrer'}><IconYearnFooter /></a>
			</div>
		</footer>
	);
}

export default Footer;
