import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../services/FirebaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import Task from './Task';
import { AiOutlineInbox } from 'react-icons/ai';

const TaskList = () => {
	const { tasks, selectedFilter } = useContext(FirebaseContext);
	const [selectedTask, setSelectedTask] = useState(0);

	const handleKeyDown = (e) => {
		let selected = selectedTask;
		if (e.key === 'ArrowUp' && tasks.length !== 0) {
			if (selectedTask > 0) {
				setSelectedTask(selectedTask - 1);
				console.log(document.getElementById(tasks[selected - 1].id));
				document.getElementById(tasks[selected - 1].id).focus();
			} else {
				setSelectedTask(tasks.length - 1);
				document.getElementById(tasks[tasks.length - 1].id).focus();
			}
			console.log(document.activeElement);
		}
		if (e.key === 'ArrowDown' && tasks.length !== 0) {
			if (selectedTask === tasks.length - 1) {
				setSelectedTask(0);
				document.getElementById(tasks[0].id).focus();
			} else {
				setSelectedTask(selectedTask + 1);
				console.log(document.getElementById(tasks[selected + 1].id));
				document.getElementById(tasks[selected + 1].id).focus();
			}
			console.log(document.activeElement);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

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
		exit: { opacity: 0, y: 30, scale: 0 },
	};

	return (
		<div className="w-full fc justify-center items-start bg-slate-100 rounded-lg mt-10 p-3 dark:bg-slate-800">
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
							{selectedFilter === 'all' &&
								tasks.map((task) => {
									return (
										<Task
											className={selectedTask === tasks.indexOf(task) ? 'selected' : ''}
											key={task.id}
											task={task}
											variants={listItem}
										/>
									);
								})}
							{selectedFilter === 'complete' &&
								tasks.map((task) => {
									return (
										task.status === 'complete' && (
											<Task
												className={selectedTask === tasks.indexOf(task) ? 'selected' : ''}
												key={task.id}
												task={task}
												variants={listItem}
											/>
										)
									);
								})}
							{selectedFilter === 'incomplete' &&
								tasks.map((task) => {
									return (
										task.status === 'incomplete' && (
											<Task
												className={selectedTask === tasks.indexOf(task) ? 'selected' : ''}
												key={task.id}
												task={task}
												variants={listItem}
											/>
										)
									);
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
							<p className="text-base text-slate-500">Click add task or press Shift + A</p>
						</motion.div>
					</AnimatePresence>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TaskList;
