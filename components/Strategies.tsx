import	React							from	'react';
import	{parseMarkdown}					from	'utils';
import	HeadIconRocket					from	'components/icons/HeadIconRocket';
import	useLocalization					from	'contexts/useLocalization';

export type TStrategy = {
	name: string;
	address: string;
	icon: string;
	description?: string;
	localization?: {[key: string]: {name: string, description: string}};
	strategies?: object[];
	noIPFS?: boolean;
 }

function	Strategies({strategiesData, vaultSymbol = '', chainExplorer, shouldHideValids, isRetired}: {strategiesData: TStrategy[], vaultSymbol?: string, chainExplorer: string, shouldHideValids?: boolean, isRetired?: boolean}): React.ReactElement {
	const	{language} = useLocalization();

	if (strategiesData.length === 0) {
		return (
			<section aria-label={'STRATEGIES'}>
				<div className={'w-full text-gray-blue-1 dark:text-gray-3'}>
					<i
						className={'text-xs'}
						dangerouslySetInnerHTML={{__html: parseMarkdown('No strategy detected.')}} />
				</div>
			</section>
		);
	}

	const	strategiesWithBoost = ['Curve Boost', 'Convex Reinvest'];
	return (
		<section aria-label={'STRATEGIES'} className={'mt-4 '}>
			{
				strategiesData.filter((s): boolean => shouldHideValids ? !s.description : true).map((strategy: TStrategy, index): React.ReactElement => (
					<div key={index} className={'relative ml-4 flex flex-col md:ml-12'}>
						<div className={'mb-4 text-gray-blue-1 dark:text-gray-3'}>
							<div className={'mb-2 flex flex-row items-center'}>
								<a href={`${chainExplorer}/address/${strategy.address}#code`} target={'_blank'} className={'inline text-yearn-blue hover:underline'} rel={'noreferrer'}>
									{strategy?.localization?.[language]?.name || strategy.name}
								</a>
								<div>
									{strategy.noIPFS ? (
										<span className={'ml-2 rounded-md bg-yearn-blue py-1 px-2 text-xs font-bold text-gray-blue-1 dark:text-gray-3'}>
											{'Missing IPFS file'}
										</span>
									) : null}
									{!isRetired && strategiesWithBoost.includes(strategy.name) ? (
										<HeadIconRocket className={'ml-2'} width={16} height={16} />
									): null}
								</div>
							</div>
							<div className={'w-full pr-4 md:pr-16'}>
								{strategy?.description ? 
									<p className={'inline'} dangerouslySetInnerHTML={{__html: parseMarkdown((strategy?.localization?.[language]?.description || strategy?.description || '').replace(/{{token}}/g, vaultSymbol) || '')}} />
									:
									<i className={'inline'} dangerouslySetInnerHTML={{__html: parseMarkdown('No description provided for this strategy.')}} />
								}
							</div>
						</div>
					</div>
				))
			}
		</section>
	);
}

export default Strategies;