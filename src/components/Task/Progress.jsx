import { useContext, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FirebaseContext } from '../../services/FirebaseContext';
import { AnimatePresence, motion } from 'framer-motion';
import { BsCheckLg } from 'react-icons/bs';

const Progress = () => {
	const { tasks } = useContext(FirebaseContext);
	const [percentage, setPercentage] = useState(0);
	useEffect(() => {
		const completedTasks = tasks.filter((task) => task.status === 'complete');

		setPercentage((completedTasks.length / tasks.length) * 100);
	}, [tasks]);

	return (
		<AnimatePresence>
			{tasks.length === 0 ? null : percentage === 100 ? (
				<AnimatePresence>
					<motion.div initial={{ scale: 0.2 }} animate={{ scale: 1 }} exit={{ scale: 0.2 }}>
						<CircularProgressbarWithChildren
							initial={{ scale: 0.2 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.2 }}
							value={percentage}
							strokeWidth={50}
							className="completeTasksProgress"
							styles={buildStyles({
								strokeLinecap: 'butt',
							})}
						>
							<BsCheckLg className="text-white" size={25} />
						</CircularProgressbarWithChildren>
					</motion.div>
				</AnimatePresence>
			) : (
				<motion.div initial={{ scale: 0.2 }} animate={{ scale: 1 }} exit={{ scale: 0.2 }}>
					<CircularProgressbar
						initial={{ scale: 0.2 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.2 }}
						value={percentage}
						strokeWidth={50}
						styles={buildStyles({
							strokeLinecap: 'butt',
						})}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Progress;
