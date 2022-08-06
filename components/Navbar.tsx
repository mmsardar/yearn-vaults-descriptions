import	React			from	'react';
import	{useRouter}		from	'next/router';
import	useNetwork		from	'contexts/useNetwork';

const options = ['Ethereum', 'Fantom', 'Arbitrum'];
const routerMapping: {[key: string]: string} = {
	'/internal/missing-descriptions': 'Strategies',
	'/internal/missing-ape': 'Strategies ape.tax',
	'/internal/missing-tokens': 'Tokens',
	'/internal/missing-translations': 'Translations'
};

function	Navbar(): React.ReactElement {
	const {currentNetwork, set_currentNetwork} = useNetwork();
	const router = useRouter();

	return (
		<nav className={'relative flex w-full flex-col'}>
			<div className={'absolute right-0 flex w-full flex-row justify-between'}>
				<div />
				<div className={'flex h-full flex-row space-x-2'}>
					<div className={'flex h-full flex-row items-center justify-start'} key={routerMapping[router.pathname]}>
						<select
							value={routerMapping[router.pathname]}
							className={'button-light m-0 mr-1 flex cursor-pointer items-center whitespace-nowrap rounded-sm border-none py-2 px-3 pr-7 text-xs font-semibold'}
							onChange={(e): void => {
								if (e.target.value === 'Strategies')
									router.push('/internal/missing-descriptions');
								else if (e.target.value === 'Strategies ape.tax')
									router.push('/internal/missing-ape');
								else if (e.target.value === 'Tokens')
									router.push('/internal/missing-tokens');
								else if (e.target.value === 'Translations')
									router.push('/internal/missing-translations');
							}}>
							{Object.entries(routerMapping).map(([key, value]): React.ReactElement => (
								<option className={'cursor-pointer'} key={key} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					<div className={'flex h-full flex-row items-center justify-start'}>
						<select
							value={currentNetwork}
							className={'button-light m-0 mr-1 flex cursor-pointer items-center whitespace-nowrap rounded-sm border-none py-2 px-3 pr-7 text-xs font-semibold'}
							onChange={(e): void => set_currentNetwork(e.target.value)}>
							{options.map((chain, index): React.ReactElement => (
								<option className={'cursor-pointer'} key={index} value={chain}>{chain}</option>
							))}
						</select>
					</div>
				</div>

			</div>

		</nav>
	);
}

export default Navbar;
