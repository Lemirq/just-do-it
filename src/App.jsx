import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from './services/firebase';
import { FirebaseContext } from './services/FirebaseContext';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './routes/Dashboard';
import Landing from './routes/Landing';
import UpdateTask from './components/Task/UpdateTask';
import AddTask from './components/Task/AddTask';
import useKeyboardShortcut from './services/useKeyboardShortcut';
import Help from './components/Misc/Help';

function App() {
	const [tasks, setTasks] = useState([]);
	const [updateTaskVisible, setUpdateTaskVisible] = useState(false);
	const [addTaskVisible, setAddTaskVisible] = useState(false);
	const [helpVisible, setHelpVisible] = useState(false);
	const [id, setId] = useState('');
	const [selectedFilter, setSelectedFilter] = useState({ value: 'all', label: 'All Tasks' });
	const [selectedTask, setSelectedTask] = useState(-1);
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [user, loading] = useAuthState(auth);
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (user) {
			onValue(ref(db, `/users/${user.uid}/`), (snapshot) => {
				const data = snapshot.val();
				const tasks = [];

				for (let key in data) {
					tasks.push({ ...data[key], id: key });
				}

				setTasks(tasks.sort((a, b) => b.day - a.day));
			});
		}
	}, [user]);

	const {} = useKeyboardShortcut(
		['Escape'],
		(shortcutKeys) => {
			setAddTaskVisible(false);
			setUpdateTaskVisible(false);
			if (!addTaskVisible || !updateTaskVisible) {
				document.querySelector('.tasklist').childNodes?.forEach((el) => {
					el.querySelector('.task').classList.remove('bg-slate-200', 'dark:bg-slate-600');
					el.querySelector('.task').classList.add('bg-white', 'dark:bg-slate-700');
				});
				document.body.focus();
			}
		},
		{
			overrideSystem: false,
			ignoreInputFields: false,
			repeatOnHold: false,
		}
	);

	return (
		<FirebaseContext.Provider
			value={{
				tasks,
				setTasks,
				updateTaskVisible,
				setUpdateTaskVisible,
				helpVisible,
				setHelpVisible,
				id,
				setId,
				selectedFilter,
				setSelectedFilter,
				addTaskVisible,
				setAddTaskVisible,
				signInWithGoogle,
				user,
				selectedTask,
				setSelectedTask,
				loading,
				search,
				setSearch,
			}}
		>
			<AnimatePresence>{addTaskVisible && <AddTask set={() => setAddTaskVisible(false)} />}</AnimatePresence>
			<AnimatePresence>{updateTaskVisible && id !== '' && <UpdateTask id={id} set={() => setUpdateTaskVisible(false)} />}</AnimatePresence>
			<AnimatePresence>{helpVisible && <Help close={() => setHelpVisible(false)} />}</AnimatePresence>
			<AnimatePresence mode="wait">
				<BrowserRouter basename="/just-do-it">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/app" element={<Dashboard />} />
					</Routes>
				</BrowserRouter>
			</AnimatePresence>
		</FirebaseContext.Provider>
	);
}

export default App;
