import React from 'react';

const LoadingSpinner = () => {
	return (
		<div className="w-screen h-screen fc justify-center items-center dark:bg-slate-900 bg-white">
			<div className="lds-ring opacity-70">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
