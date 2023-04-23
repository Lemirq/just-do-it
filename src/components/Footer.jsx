import React from 'react';

const Footer = () => {
	return (
		<div className="w-full mt-10 mb-5 fr sm:fc justify-around items-center">
			<p className="text-slate-500">
				© {new Date().getFullYear()}{' '}
				<a href="https://lemirq.github.io/" className="text-violet-600">
					Vihaan Sharma
				</a>
				{'. '}
				All rights reserved.
			</p>
			<p>
				<a href="mailto:sharmavihaan190@gmail.com" className="text-slate-500">
					Contact
				</a>
			</p>
		</div>
	);
};

export default Footer;
