import	React							from	'react';
import {GetStaticProps}					from	'next';
import	Link							from	'next/link';
import	HeadIconGhost					from	'components/icons/HeadIconGhost';
import	Vaults, {TVault}				from	'components/Vaults';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';
import	{parseMarkdown}					from	'utils';

const	chainExplorer = 'http://ftmscan.com';

function	Index({vaults}: {vaults: TVault[]}): React.ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'w-full rounded-sm bg-white p-4 dark:bg-black'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconGhost width={40} height={40} className={'text-yearn-blue dark:text-white'} />
					</div>
					<h1 className={'mb-8 whitespace-pre-line text-4xl font-bold text-dark-blue-1 dark:text-white md:text-6xl'}>
						{common['page-ftm-stable-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline whitespace-pre-line text-gray-blue-1 dark:text-gray-3'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-ftm-stable-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				{vaults.map((vault): React.ReactElement => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} />)}
			</div>
			<div className={'w-full'}>
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/fantom/defi-tokens'}>
						<button className={'button-large button-filled'}>
							{common['page-ftm-stable-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export const getStaticProps: GetStaticProps = async (): Promise<{props: {vaults: TVault[]}, revalidate: number}> => {
	const	strategiesRaw = await listVaultsWithStrategies({network: 250, isStable: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}, revalidate: 60 * 60};
};

export default Index;
