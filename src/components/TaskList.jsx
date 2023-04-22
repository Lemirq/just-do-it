import { useContext } from 'react';
import { FirebaseContext } from '../services/FirebaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import Task from './Task';
import { AiOutlineInbox } from 'react-icons/ai';
const TaskList = () => {
	const { tasks } = useContext(FirebaseContext);
	console.log(tasks);

	const container = {
		hidden: { opacity: 1 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
		exit: {
			opacity: 0,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const listItem = {
		hidden: { opacity: 0, y: 30 },
		show: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 30 },
	};

	return (
		<div className="w-full h-full fc justify-center items-start bg-slate-100 rounded-lg mt-10 p-3">
			<AnimatePresence>
				{tasks.length > 0 ? (
					<motion.div
						className="w-full h-full fc justify-center items-start gap-3"
						variants={container}
						animate="show"
						initial="hidden"
						exit="exit"
					>
						<AnimatePresence>
							{tasks.map((task) => {
								return <Task variants={listItem} key={task.id} task={task} />;
							})}
						</AnimatePresence>
					</motion.div>
				) : (
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							className="w-full h-full fc items-center justify-center my-3"
						>
							<AiOutlineInbox className="text-6xl text-slate-500" />
							<p className="text-xl">No todos</p>
							<p className="text-base text-slate-500">Click add task</p>
						</motion.div>
					</AnimatePresence>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TaskList;
