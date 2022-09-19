import	React, {ReactElement}		from	'react';

function	Icon (props: React.SVGProps<SVGSVGElement>): ReactElement {
	const defaultProps = {
		width: 40,
		height: 40
	};

	props = {...defaultProps, ...props};

	return (
		<svg width={'24'} height={'24'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'3 3 18 18'} {...props} className={'rounded-full bg-neutral-300'} >
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M11.2589 1.01189C8.55888 1.21883 6.11374 2.3305 4.23408 4.20574C3.32901 5.10868 2.67092 6.02983 2.11837 7.16715C1.62155 8.18977 1.30959 9.20849 1.12538 10.4099C1.03277 11.0139 1.00097 11.4003 1.00001 11.9326C0.998489 12.7993 1.13595 13.8798 1.35687 14.7376C1.97018 17.119 3.40045 19.2686 5.36114 20.7559C5.9215 21.1809 6.45456 21.51 7.11246 21.8371C8.50198 22.5279 9.89358 22.8833 11.6244 22.9894C12.4737 23.0414 13.6853 22.8998 14.813 22.6165C17.6886 21.8941 20.2722 19.8455 21.708 17.1492C22.3682 15.9093 22.7547 14.6315 22.9474 13.0509C23.0038 12.5887 23.0173 11.7412 22.9758 11.2746C22.7665 8.9254 22.0709 7.07526 20.7353 5.31548C20.4334 4.91785 20.1897 4.64285 19.7511 4.20525C19.2999 3.75506 19.0542 3.53886 18.6182 3.20861C16.9982 1.98155 15.1238 1.25099 13.0469 1.03716C12.7187 1.00338 11.58 0.987286 11.2589 1.01189ZM12.6751 2.51507C14.286 2.62814 15.865 3.16229 17.2012 4.04612C18.4442 4.86834 19.5106 6.00064 20.2418 7.27464C20.9068 8.43333 21.2753 9.60539 21.4508 11.1196C21.5593 12.0567 21.4946 12.9914 21.2434 14.1171C20.9112 15.6054 20.2487 16.9251 19.2257 18.1362C18.9822 18.4245 18.442 18.9669 18.1508 19.2155C17.0789 20.1309 15.795 20.8114 14.5121 21.1442C13.6502 21.3678 12.7852 21.4882 12.0299 21.4898C11.5765 21.4908 11.4482 21.4812 10.788 21.3973C9.70582 21.2596 8.77805 20.9848 7.83644 20.5231C5.32549 19.2918 3.47781 17.0099 2.7974 14.2998C2.61118 13.558 2.46738 12.3466 2.49634 11.7634C2.57182 10.2432 2.96119 8.75247 3.59121 7.57183C4.54697 5.78073 5.97259 4.38986 7.77062 3.49431C8.91882 2.92242 10.0913 2.60393 11.3999 2.50843C11.6082 2.49324 12.4246 2.49749 12.6751 2.51507ZM9.43484 7.46979C8.54884 7.51419 7.78508 7.7697 7.10855 8.24807C6.9066 8.39085 6.53916 8.73845 6.37485 8.94213C6.02004 9.38195 5.71049 9.98724 5.52386 10.6061C5.36236 11.1416 5.21153 11.7958 5.13782 12.2805C5.08629 12.6193 5.06647 13.313 5.09925 13.6309C5.13597 13.9869 5.22955 14.319 5.37282 14.6016C5.39828 14.6518 5.48849 14.7973 5.5733 14.9247C5.87287 15.3752 6.28684 15.7225 6.85807 16.0025C7.50318 16.3188 8.04286 16.4186 9.01173 16.4008C9.5642 16.3906 9.73991 16.3695 10.1336 16.2659C10.4427 16.1846 10.6856 16.0951 10.9821 15.953L11.213 15.8423L11.3249 15.9354C11.5399 16.1142 11.8355 16.2473 12.1479 16.3058C12.3626 16.346 13.289 16.3637 13.5805 16.3332C14.0031 16.289 14.3438 16.1581 14.6214 15.9334C14.9785 15.6443 15.1782 15.2598 15.3418 14.5459C15.3846 14.359 15.4016 14.3135 15.4328 14.302C15.4539 14.2942 15.58 14.2822 15.7131 14.2753C16.3859 14.2405 16.9241 14.1153 17.3892 13.8856C17.9715 13.598 18.4744 13.1076 18.8238 12.4869C19.037 12.1082 19.2343 11.5775 19.3306 11.1243C19.3746 10.917 19.3805 10.8471 19.3804 10.5321C19.3803 10.1276 19.3512 9.94636 19.2307 9.60022C18.9277 8.72995 18.1808 8.03239 17.2316 7.73317C16.7954 7.59568 16.4618 7.55466 15.6122 7.5341C14.6215 7.51013 13.6024 7.52175 13.4026 7.55929C12.9704 7.64053 12.6693 7.79008 12.3837 8.06542L12.2486 8.19568L12.0897 8.09003C11.6196 7.77731 11.0107 7.55103 10.4973 7.49821C10.2832 7.47618 9.64699 7.45917 9.43484 7.46979ZM10.445 9.00913C11.1048 9.12467 11.6936 9.57589 11.9073 10.1299C12.0139 10.4062 12.0288 10.4889 12.0274 10.7953C12.0264 11.0122 12.0144 11.1445 11.9755 11.3686C11.9006 11.7999 11.7648 12.4115 11.6728 12.7315C11.3395 13.8921 10.8264 14.4836 9.90496 14.7693C9.56768 14.8739 9.48138 14.8864 9.02595 14.8973C8.31165 14.9144 7.95045 14.86 7.56846 14.6775C7.17749 14.4909 6.9771 14.3279 6.79432 14.048C6.60915 13.7644 6.57718 13.6032 6.59106 13.0229C6.60266 12.5378 6.64554 12.2612 6.81251 11.5942C6.93613 11.1005 7.02338 10.8245 7.13937 10.5603C7.38471 10.0016 7.75693 9.57757 8.24074 9.30572C8.53693 9.13927 8.98373 9.00821 9.34646 8.98137C9.63925 8.95967 10.2508 8.97514 10.445 9.00913ZM15.5016 9.03724C16.2279 9.0557 16.4357 9.07246 16.6652 9.13117C17.233 9.27632 17.6678 9.65376 17.8244 10.1373C17.9219 10.4384 17.9028 10.7591 17.7622 11.1794C17.6203 11.6037 17.4373 11.9275 17.1972 12.1788C16.8611 12.5306 16.5294 12.6798 15.9284 12.7493C15.6753 12.7785 14.8363 12.8155 14.4145 12.8159C14.2884 12.816 14.1805 12.8238 14.1747 12.8332C14.1689 12.8425 14.1087 13.1195 14.0409 13.4488C13.8583 14.3357 13.7733 14.6565 13.6993 14.7382C13.6125 14.8341 13.5919 14.837 12.9889 14.837C12.3975 14.837 12.2975 14.8254 12.2749 14.7541C12.2446 14.6588 12.4045 13.8089 12.8551 11.6694C13.2375 9.85377 13.3739 9.23945 13.4068 9.18298C13.4532 9.10369 13.5345 9.05904 13.6683 9.03951C13.8205 9.01731 14.676 9.01624 15.5016 9.03724ZM9.48185 10.1924C9.028 10.2886 8.73461 10.5441 8.56095 10.9942C8.45771 11.2618 8.32032 11.8042 8.21063 12.377C8.14634 12.7127 8.13649 13.1453 8.18967 13.2976C8.29114 13.5882 8.61996 13.7316 9.06819 13.6809C9.29446 13.6553 9.44394 13.6042 9.59919 13.4994C9.871 13.3161 10.0441 12.9826 10.2122 12.318C10.4791 11.2634 10.5156 10.7012 10.3348 10.4281C10.1983 10.2219 9.82701 10.1193 9.48185 10.1924ZM14.7015 10.2437C14.697 10.2576 14.6501 10.4804 14.5972 10.7389C14.5443 10.9974 14.4847 11.285 14.4646 11.378C14.4155 11.6058 14.4165 11.625 14.4785 11.6405C14.6293 11.6784 15.4282 11.6356 15.6975 11.5753C15.9816 11.5116 16.1944 11.2608 16.2611 10.9111C16.2964 10.7255 16.297 10.5545 16.2624 10.4889C16.2253 10.4182 16.0842 10.2852 16.0165 10.257C15.9307 10.2212 14.7128 10.2089 14.7015 10.2437Z'} className={'text-neutral-900'} fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;
