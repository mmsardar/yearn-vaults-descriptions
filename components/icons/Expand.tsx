import	React, {ReactElement}		from	'react';

function	Icon(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg {...props} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M14 3C14 2.44772 14.4477 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V4H15C14.4477 4 14 3.55228 14 3Z'} fill={'#0657F9'}/>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289Z'} fill={'#0657F9'}/>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M5 6C4.44828 6 4 6.44828 4 7V19C4 19.5517 4.44828 20 5 20H17C17.5517 20 18 19.5517 18 19V18C18 17.4477 18.4477 17 19 17C19.5523 17 20 17.4477 20 18V19C20 20.6563 18.6563 22 17 22H5C3.34372 22 2 20.6563 2 19V7C2 5.34372 3.34372 4 5 4H6C6.55228 4 7 4.44772 7 5C7 5.55228 6.55228 6 6 6H5Z'} fill={'#0657F9'}/>
		</svg>
	);
}

export default Icon;
