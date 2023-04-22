import React from 'react';

const Welcome = () => {
	return (
		<div className="w-screen h-screen fc justify-center items-center bg-black text-white">
			<div className="w-full h-full absolute">
				<div className="blob1 w-[60vw] h-[60vw] relative -top-[30vw]"></div>
			</div>
			<h1 className="text-2xl md:text-7xl italic font-semibold tracking-tighter">Just Do It</h1>
			<p>Just do it is a simple todo app that allows you to add, update and delete tasks.</p>
			<p>It uses Firebase for storing your data, meaning that your tasks will be saved even if you close the browser.</p>
		</div>
	);
};

export default Welcome;
