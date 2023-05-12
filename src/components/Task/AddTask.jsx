import { useState, useContext, useEffect } from 'react';
import { push, ref } from 'firebase/database';
import { db } from '../../services/firebase';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FirebaseContext } from '../../services/FirebaseContext';
import Button from '../Common/Button';
import Modal from '../Common/Modal';

const AddTask = ({ set }) => {
	const { user } = useContext(FirebaseContext);
	const [name, setName] = useState('');
	const [status, setStatus] = useState('incomplete');
	const [priority, setPriority] = useState('none');

	const handleAdd = (e) => {
		e?.preventDefault();
		if (name === '') {
			toast.error('Please enter a title', {
				className: 'bg-white dark:bg-slate-600 text-black dark:text-white',
			});
			return;
		}
		push(ref(db, `/users/${user.uid}/`), {
			text: name,
			day: new Date().getTime(),
			status: status,
			priority: priority,
		});
		toast.success('Todo added', {
			className: 'bg-white dark:bg-slate-600 text-black dark:text-white',
		});
		set();
	};

	const handleCancel = (e) => {
		e?.preventDefault();
		set();
	};

	useEffect(() => {
		setTimeout(() => {
			setName('');
		}, 50);
	}, []);

	return (
		<Modal
			close={set}
			cClassName={'w-[90%] max-w-7xl sm:w-1/2 bg-slate-200 dark:bg-slate-800 dark:text-white rounded-lg z-10 px-7 sm:px-10 py-7'}
		>
			<form className="w-full fc justify-center items-start gap-3">
				<h3 className="sm:text-2xl text-3xl">Add Todo</h3>
				<label className="w-full">
					<p className="mb-2 text-lg sm:text-base">Title</p>
					<input
						autoFocus
						className="w-full px-2 py-2 rounded-lg dark:bg-slate-600 outline-none"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<div className="w-full fc md:fr justify-between items-center gap-3 md:gap-2">
					<label className="w-full">
						<p className="mb-2 text-lg sm:text-base">Priority</p>
						<select
							name="status"
							id="status"
							className="w-full px-2 py-2 rounded-lg dark:bg-slate-600 text-lg sm:text-base"
							value={priority}
							onChange={(e) => setPriority(e.target.value)}
						>
							<option value="none">⚪️ None</option>
							<option value="low">🟢 Low</option>
							<option value="medium">🟡 Medium</option>
							<option value="high">🔴 High</option>
							<option value="urgent">🔥 Urgent</option>
						</select>
					</label>
					<label className="w-full">
						<p className="mb-2 text-lg sm:text-base">Status</p>
						<select
							name="priority"
							id="priority"
							className="w-full px-2 py-2 rounded-lg dark:bg-slate-600 text-lg sm:text-base"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="incomplete">❌ Incomplete</option>
							<option value="complete">✅ Complete</option>
						</select>
					</label>
				</div>
				<div className="fr justify-center items-center w-full gap-2">
					<Button onClick={handleAdd} type="primary" className="mt-3 w-full text-lg sm:text-base">
						Add
					</Button>
					<Button onClick={handleCancel} type="secondary" className="mt-3 w-full text-lg sm:text-base">
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddTask;
