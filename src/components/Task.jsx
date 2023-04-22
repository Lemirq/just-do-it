import { useContext } from 'react';
import Checkbox from './Checkbox';
import { remove, ref, update } from 'firebase/database';
import { db } from '../services/firebase';
import { TbTrashFilled, TbEdit } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { FirebaseContext } from '../services/FirebaseContext';

const Task = ({ task, variants }) => {
	const { setId, setUpdateTaskVisible } = useContext(FirebaseContext);
	const { status, day, text } = task;
	console.log(status);

	const handleCheckbox = (checked) => {
		update(ref(db, `/tasks/${task.id}`), {
			status: checked ? 'complete' : 'incomplete',
		});
	};

	const handleDelete = () => {
		remove(ref(db, `/tasks/${task.id}`));
	};

	const handleUpdate = (el) => {
		let id = el.target.parentElement.parentElement.parentElement.id
			? el.target.parentElement.parentElement.parentElement.id
			: el.target.parentElement.parentElement.parentElement.parentElement.id
			? el.target.parentElement.parentElement.parentElement.parentElement.id
			: el.target.parentElement.parentElement.id;
		setId(id);
		setUpdateTaskVisible(true);
	};

	function formatDate(date) {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const suffixes = ['th', 'st', 'nd', 'rd'];

		date = new Date(date);
		const day = date.getDate();
		const daySuffix = suffixes[(day - 1) % 10 < 4 ? day % 10 : 0];
		const month = monthNames[date.getMonth()];
		// const year = date.getFullYear();
		const hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
		const minute = date.getMinutes();
		const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

		return `${month} ${day}${daySuffix} at ${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
	}

	return (
		<motion.label
			key={task.id}
			id={task.id}
			variants={variants}
			initial="hidden"
			animate="show"
			exit="exit"
			className="w-full h-16 bg-white rounded-lg flex items-center justify-between px-4 cursor-pointer hover:bg-slate-200 transition-colors"
		>
			<div className="fr justify-center items-center gap-3">
				<Checkbox defaultChecked={status === 'incomplete' ? false : true} onChange={handleCheckbox} />
				<div className="fc items-start justify-start">
					<p className="text-lg">{text}</p>
					<p className="text-sm text-slate-600">{formatDate(day)}</p>
				</div>
			</div>
			<div className="fr justify-center items-center gap-2">
				<motion.button
					initial={{ y: 0 }}
					whileHover={{ y: -2, shadow: '0 0 10px rgba(0,0,0,0.5)' }}
					onClick={handleUpdate}
					className="p-2 bg-slate-300 hover:bg-slate-400 transition-colors rounded-md"
				>
					<TbEdit />
				</motion.button>

				<motion.button
					initial={{ y: 0 }}
					whileHover={{ y: -2, shadow: '0 0 10px rgba(0,0,0,0.5)' }}
					onClick={handleDelete}
					className="p-2 bg-slate-300 hover:bg-slate-400 transition-colors rounded-md"
				>
					<TbTrashFilled />
				</motion.button>
			</div>
		</motion.label>
	);
};

export default Task;
