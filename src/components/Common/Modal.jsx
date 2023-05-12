import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Modal = ({ children, cClassName, close }) => {
	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				close();
			}
		});

		return () => {
			window.removeEventListener('keydown', (e) => {
				if (e.key === 'Escape') {
					close();
				}
			});
		};
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="w-screen h-screen fixed fc justify-center items-center bg-black/60 z-50"
		>
			<div className="w-full h-full absolute" onClick={close} />
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.2 }}
				className={cClassName}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default Modal;
