import { useContext, useEffect } from 'react';

import useKeyboardShortcut from 'use-keyboard-shortcut';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../services/FirebaseContext';

const Dashboard = () => {
	const navigate = useNavigate();

	const { selectedFilter, setSelectedFilter, setAddTaskVisible, user } = useContext(FirebaseContext);

	useEffect(() => {
		if (!user) {
			navigate('/just-do-it/');
		}
	}, [user]);

	const {} = useKeyboardShortcut(
		['Shift', 'A'],
		(shortcutKeys) => {
			setAddTaskVisible(true);
		},
		{
			overrideSystem: false,
			ignoreInputFields: true,
			repeatOnHold: false,
		}
	);

	const greeting = () => {
		const date = new Date();
		const hour = date.getHours();
		if (hour < 12) {
			return 'Good Morning';
		} else if (hour < 18) {
			return 'Good Afternoon';
		} else {
			return 'Good Evening';
		}
	};

	if (user) {
		return (
			<>
				<Toaster />
				<motion.div
					initial={{ scale: 0.2 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.2 }}
					className="w-screen h-screen fc items-center justify-start px-10 font-rubik overflow-x-hidden scrollbar-hide relative dark:bg-slate-900 dark:text-white"
				>
					<Navbar />
					<h1 className="text-5xl font-medium pt-24 ">
						{greeting()}, {user.displayName.split(' ')[0]}
					</h1>
					<div className="fr justify-between items-center w-full">
						<button
							className="px-7 py-2 fr justify-center items-center rounded-lg bg-violet-600 text-white mt-3 gap-2"
							onClick={(e) => setAddTaskVisible(true)}
						>
							Add Task <span className="text-sm text-zinc-300">Shift + A</span>
						</button>
						<select
							className="px-7 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-white text-black mt-3"
							name="filter"
							id="filter"
							value={selectedFilter}
							onChange={(e) => setSelectedFilter(e.target.value)}
						>
							<option value="all">All</option>
							<option value="incomplete">Incomplete</option>
							<option value="complete">Complete</option>
						</select>
					</div>

					<TaskList />
					<Footer />
				</motion.div>
			</>
		);
	}
};

export default Dashboard;
