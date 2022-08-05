import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	HeadIconYearn			from	'components/icons/HeadIconYearn';
import	HeadIconEth				from	'components/icons/HeadIconEth';
import	HeadIconFtm				from	'components/icons/HeadIconFtm';
import	{useLocalization}		from	'contexts/useLocalization';
import	{parseMarkdown}			from	'utils';

function	Index(): ReactElement {
	const	{common} = useLocalization();

	return (
		<article className={'w-full rounded-sm bg-white p-4 dark:bg-black'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconYearn />
					</div>
					<h1
						className={'mb-8 whitespace-pre-line text-4xl font-bold text-dark-blue-1 dark:text-white md:text-6xl'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['overview-title'])}} />
					<div className={'mb-8'}>
						<p
							className={'inline whitespace-pre-line text-gray-blue-1 dark:text-gray-3'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['overview-description'])}}>
						</p>
					</div>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'mb-2 flex flex-row items-center'}>
					<div className={'mr-4 h-10 w-10'}>
						<HeadIconEth className={'h-10 w-10'}/>
					</div>
					<div>
						<h1 className={'title'}>
							{common['yearn-and-curve-eth-vault-title']}
						</h1>
					</div>
				</div>
				<div className={'w-full max-w-full'}>
					<p
						className={'text-gray-blue-1 dark:text-gray-3'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-eth-vault-description'])}}>
					</p>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'mt-8 mb-2 flex flex-row items-center'}>
					<div className={'mr-4 h-10 w-10'}>
						<HeadIconFtm className={'h-10 w-10'}/>
					</div>
					<div>
						<h1 className={'title'}>
							{common['yearn-and-curve-ftm-vault-title']}
						</h1>
					</div>
				</div>
				<div className={'w-full max-w-full'}>
					<p
						className={'text-gray-blue-1 dark:text-gray-3'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-ftm-stable-description'])}}>
					</p>
				</div>
			</div>

			<div className={'mt-16 w-full'}>
				<div className={'self-center md:self-auto'}>
					<Link href={'/yearn-and-curve'}>
						<button className={'button-large button-filled'}>
							{common['overview-button']}
						</button>
					</Link>
				</div>
			</div>
		</article>
	);
}

export default Index;
