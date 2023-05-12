import { useContext, useEffect } from 'react';
import { FirebaseContext } from '../../services/FirebaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import Task from './Task';
import { AiOutlineInbox } from 'react-icons/ai';
import { IoIosSad } from 'react-icons/io';

const TaskList = () => {
	const { tasks, selectedFilter, setSelectedFilter, selectedTask, setSelectedTask, search, setSearch } = useContext(FirebaseContext);

	const handleKeyDown = (e) => {
		if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1) {
			e.preventDefault();
		}

		if (e.key === 'ArrowUp' && tasks.length !== 0) {
			setSelectedTask((selectedTask) => {
				const newSelectedTask = selectedTask <= 0 ? tasks.length - 1 : selectedTask - 1;
				const newSelectedTaskId = tasks[newSelectedTask].id;
				document.getElementById(newSelectedTaskId).focus();
				return newSelectedTask;
			});
		}

		if (e.key === 'ArrowDown' && tasks.length !== 0) {
			setSelectedTask((selectedTask) => {
				const newSelectedTask = selectedTask === tasks.length - 1 ? 0 : selectedTask + 1;
				const newSelectedTaskId = tasks[newSelectedTask].id;
				document.getElementById(newSelectedTaskId).focus();
				return newSelectedTask;
			});
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);
	const allIncomplete = tasks.filter((task) => task.status === 'incomplete');
	const allComplete = tasks.filter((task) => task.status === 'complete');

	const tasksToDisplay =
		selectedFilter.value === 'all'
			? tasks.filter((task) => search.toLowerCase() === '' || task.text.toLowerCase().includes(search.toLowerCase()))
			: selectedFilter.value === 'incomplete'
			? allIncomplete.filter((task) => search.toLowerCase() === '' || task.text.toLowerCase().includes(search.toLowerCase()))
			: allComplete.filter((task) => search.toLowerCase() === '' || task.text.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="w-full fc justify-center items-start bg-slate-100 rounded-lg mt-10 px-3 dark:bg-slate-800 shadow-lg">
			<AnimatePresence initial={false}>
				{tasks.length > 0 ? (
					<motion.div
						className="w-full h-full fc justify-center items-start pb-3 tasklist"
						// variants={container}
						animate="show"
						initial="hidden"
						exit="exit"
					>
						<AnimatePresence>
							{tasksToDisplay.length > 0 ? (
								<AnimatePresence>
									{tasksToDisplay.map((task) => (
										<Task className={selectedTask === tasks.indexOf(task) ? 'selected' : ''} key={task.id} task={task} />
									))}
								</AnimatePresence>
							) : (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									className="w-full h-full fc items-center justify-center my-3 py-3"
								>
									<IoIosSad className="text-6xl text-slate-500" />
									<p className="text-xl">No todos in this filter</p>
									<p className="text-base text-slate-500">
										<button
											onClick={() => {
												setSelectedFilter({ value: 'all', label: 'All Tasks' });
												setSearch('');
											}}
											className="text-violet-500"
										>
											Clear filters
										</button>{' '}
										or add a task
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				) : (
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							className="w-full h-full fc items-center justify-center my-3 py-3"
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
