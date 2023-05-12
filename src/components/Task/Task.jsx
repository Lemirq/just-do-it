import { useContext } from 'react';
import useKeyboardShortcut from '../../services/useKeyboardShortcut';
import Checkbox from './Checkbox';
import { remove, ref, update } from 'firebase/database';
import { db } from '../../services/firebase';
import { TbTrashFilled, TbEdit } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { FirebaseContext } from '../../services/FirebaseContext';

const Task = ({ task, className }) => {
	const { setId, setUpdateTaskVisible, user, setSelectedTask, selectedTask, tasks } = useContext(FirebaseContext);
	const { status, day, text } = task;

	const {} = useKeyboardShortcut(
		['Shift', 'Enter'],
		() => {
			handleUpdate({ target: { dataset: { id: document.activeElement.dataset.id } } });
		},
		{
			overrideSystem: false,
			ignoreInputFields: false,
			repeatOnHold: false,
		}
	);

	useKeyboardShortcut(['Shift', 'Backspace'], () => {
		const s = selectedTask;
		handleDelete(document.activeElement.dataset.id, () => {
			const index = s === 0 ? 0 : s === tasks.length - 1 ? s - 1 : s === null ? null : s - 1;
			if (tasks.length > 0) {
				if (index !== null) {
					document.getElementById(tasks[index].id).focus();
					setSelectedTask(index);
				} else {
					document.querySelector('.tasklist>div').childNodes[0].focus();
					setSelectedTask(0);
				}
			} else {
				setSelectedTask(null);
			}
		});
	});

	const handleCheckbox = (checked) => {
		update(ref(db, `/users/${user.uid}/${task.id}`), {
			status: checked ? 'complete' : 'incomplete',
		});
	};
	// convert to promise
	const handleDelete = (id, callback) => {
		remove(ref(db, `/users/${user.uid}/${id}`)).then(() => callback());
	};

	const handleUpdate = (el) => {
		console.log(el.target.dataset.id);
		setId(el.target.dataset.id);
		setUpdateTaskVisible(true);
	};

	function formatDate(date) {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const suffixes = ['th', 'st', 'nd', 'rd'];

		date = new Date(date);
		const day = date.getDate();
		const daySuffix = day % 10 <= 3 ? suffixes[day % 10] : suffixes[0];
		const month = monthNames[date.getMonth()];
		// const year = date.getFullYear();
		const hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
		const minute = date.getMinutes();
		const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

		return `${month} ${day}${daySuffix} at ${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
	}

	return (
		<motion.div
			initial={{ height: 0, opacity: 0, margin: 0 }}
			animate={{
				height: 'auto',
				opacity: 1,
				marginTop: '0.75em',
				transition: {
					type: 'spring',
					bounce: 0.3,
					opacity: {
						delay: 0.1,
					},
				},
			}}
			exit={{ height: 0, opacity: 0, padding: 0, marginTop: 0 }}
			transition={{
				duration: 0.6,
				type: 'spring',
				bounce: 0,
				position: {
					delay: 1,
				},
				opacity: {
					duration: 0.12,
				},
			}}
			className="w-full py-0.5"
		>
			<label
				key={task.id}
				id={task.id}
				className={`w-full task ${
					className ? 'bg-slate-200 dark:bg-slate-600' : 'bg-white dark:bg-slate-700'
				} focus rounded-lg flex items-center justify-between gap-2 px-4 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors`}
			>
				<div className="fr justify-center max-w-[70%] items-center gap-2">
					<Checkbox id={task.id} defaultChecked={status === 'incomplete' ? false : true} onChange={handleCheckbox} />
					<div className="fc items-start justify-start flex-shrink-[10]">
						<p className={`transition-all break-normal sm:text-lg ${status === 'complete' ? 'line-through text-slate-500' : ''}`}>
							{text}
						</p>
						<p className="text-sm text-slate-600 dark:text-slate-400">{formatDate(day)}</p>
					</div>
				</div>
				<div className="fr justify-center items-center max-w-[30%] gap-2">
					<motion.button
						data-id={task.id}
						initial={{ y: 0 }}
						whileHover={{ y: -2, shadow: '0 0 10px rgba(0,0,0,0.5)' }}
						onClick={handleUpdate}
						className="p-2 bg-slate-300 dark:bg-slate-500 hover:bg-slate-400 transition-colors rounded-md"
					>
						<TbEdit data-id={task.id} />
					</motion.button>

					<motion.button
						initial={{ y: 0 }}
						whileHover={{ y: -2, shadow: '0 0 10px rgba(0,0,0,0.5)' }}
						onClick={() => handleDelete(task.id)}
						className="p-2 bg-slate-300 dark:bg-slate-500 hover:bg-slate-400 transition-colors rounded-md"
					>
						<TbTrashFilled />
					</motion.button>
				</div>
			</label>
		</motion.div>
	);
};

export default Task;
