import	React, {useContext, createContext}	from	'react';

const options = ['Ethereum', 'Fantom'];

const NETWORK_IDS: {[key: string]: number} = {
	'Ethereum': 1,
	'Fantom': 250
};

type TNetworkContext = {
	currentNetwork: string,
	currentChainId: number,
	set_currentNetwork: (currentNetwork: string) => void;
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const	Network = createContext<TNetworkContext>({currentNetwork: '', currentChainId: 1, set_currentNetwork: (_n): void => void 0});
export const NetworkContextApp = ({children}: {children: React.ReactNode}): React.ReactElement => {
	const	[currentNetwork, set_currentNetwork] = React.useState(options[0]);


	return (
		<Network.Provider
			value={{
				currentNetwork,
				currentChainId: NETWORK_IDS[currentNetwork],
				set_currentNetwork
			}}>
			{children}
		</Network.Provider>
	);
};

export const useNetwork = (): TNetworkContext => useContext(Network);
export default useNetwork;
