import { useState, useContext, useEffect } from 'react';
import { update, ref } from 'firebase/database';
import { db } from '../services/firebase';
import { motion } from 'framer-motion';
import { FirebaseContext } from '../services/FirebaseContext';
const UpdateTask = ({ set, id }) => {
	const { tasks, user } = useContext(FirebaseContext);
	console.log(tasks);
	const [name, setName] = useState('');
	const [status, setStatus] = useState('incomplete');
	const [seconds, setSeconds] = useState(100);

	const handleUpdate = (e) => {
		e?.preventDefault();
		update(ref(db, `/users/${user.uid}/${id}`), {
			text: name,
			status: status,
		});
		set();
	};

	const handleCancel = (e) => {
		e?.preventDefault();
		set();
	};

	useEffect(() => {
		setTimeout(() => {
			setSeconds(0);
		}, 100);
	}, []);

	return (
		seconds === 0 && (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="w-screen h-screen fixed fc justify-center items-center bg-black/60 z-10"
			>
				<div className="w-full h-full absolute" onClick={set} />
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.2 }}
					className="w-1/2 bg-slate-200 dark:bg-slate-800 dark:text-white rounded-lg z-10 px-10 py-7"
				>
					<form className="w-full fc justify-center items-start gap-3">
						<h3 className="text-2xl">Edit Todo</h3>
						<label className="w-full">
							<p>Title</p>
							<input
								autoFocus
								className="w-full px-2 py-2 rounded-lg dark:bg-slate-600 outline-none"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label className="w-full">
							<p>Status</p>
							<select
								name="status"
								id="status"
								className="w-full px-2 py-2 rounded-lg dark:bg-slate-600"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="incomplete">Incomplete</option>
								<option value="complete">Complete</option>
							</select>
						</label>
						<div className="fr justify-center items-center  gap-2">
							<button onClick={handleUpdate} className="w-full px-7 py-2 rounded-lg bg-violet-600 text-white mt-3">
								Update
							</button>
							<button onClick={handleCancel} className="w-full px-7 py-2 rounded-lg bg-slate-300 dark:bg-slate-600 mt-3">
								Cancel
							</button>
						</div>
					</form>
				</motion.div>
			</motion.div>
		)
	);
};

export default UpdateTask;
