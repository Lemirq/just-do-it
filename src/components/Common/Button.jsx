import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, type, className, children }) => {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			className={`px-7 py-2 rounded-lg inline-flex justify-center items-center gap-2 ${
				type === 'primary' ? 'bg-violet-600 text-white' : 'bg-slate-300 dark:bg-slate-600'
			} ${className}`}
		>
			{children}
		</motion.button>
	);
};

export default Button;
