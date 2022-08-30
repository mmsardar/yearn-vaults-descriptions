import	React, {ReactElement}		from	'react';

function	Icon (props: React.SVGProps<SVGSVGElement>): ReactElement {
	const defaultProps = {
		width: 40,
		height: 40
	};

	props = {...defaultProps, ...props};

	return (
		<svg {...props} viewBox={'0 0 40 40'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M3.33334 16.9443C3.33334 8.50636 10.795 1.6665 20 1.6665C29.205 1.6665 36.6667 8.50636 36.6667 16.9443V38.3332H3.33334V16.9443ZM11.25 15.4165H13.3333C13.5633 15.4165 13.75 15.5876 13.75 15.7984V18.854C13.75 19.0648 13.5633 19.2359 13.3333 19.2359H11.25V15.4165ZM16.25 18.854C16.25 19.7325 15.78 20.5055 15.065 20.9929L16.1183 22.9255C16.4267 23.4908 16.1767 24.1783 15.56 24.4625C15.38 24.545 15.19 24.5832 15.0017 24.5832C14.5433 24.5832 14.1017 24.3525 13.8833 23.9491L12.5633 21.5276H11.2517V23.4373C11.2517 24.0698 10.6917 24.5832 10.0017 24.5832C9.31168 24.5832 8.75168 24.0698 8.75168 23.4373V13.1248H13.335C14.9433 13.1248 16.2517 14.3241 16.2517 15.7984L16.25 18.854ZM20 24.5832C20.69 24.5832 21.25 24.0698 21.25 23.4373V14.2707C21.25 13.6382 20.69 13.1248 20 13.1248C19.31 13.1248 18.75 13.6382 18.75 14.2707V23.4373C18.75 24.0698 19.31 24.5832 20 24.5832ZM31.25 18.854C31.25 20.3283 29.9417 21.5276 28.3333 21.5276H26.25V23.4373C26.25 24.0698 25.69 24.5832 25 24.5832C24.31 24.5832 23.75 24.0698 23.75 23.4373V13.1248H28.3333C29.9417 13.1248 31.25 14.3241 31.25 15.7984V18.854ZM26.25 15.4165H28.3333C28.5633 15.4165 28.75 15.5876 28.75 15.7984V18.854C28.75 19.0648 28.5633 19.2359 28.3333 19.2359H26.25V15.4165Z'} className={'text-primary-500'} fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;