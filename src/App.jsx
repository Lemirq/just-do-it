import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from './services/firebase';
import { FirebaseContext } from './services/FirebaseContext';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './routes/Dashboard';
import Landing from './routes/Landing';
import UpdateTask from './components/UpdateTask';
import AddTask from './components/AddTask';
import useKeyboardShortcut from 'use-keyboard-shortcut';

function App() {
	const [tasks, setTasks] = useState([]);
	const [updateTaskVisible, setUpdateTaskVisible] = useState(false);
	const [id, setId] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('all');
	const [addTaskVisible, setAddTaskVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState(0);
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [user] = useAuthState(auth);
	useEffect(() => {
		if (user) {
			onValue(ref(db, `/users/${user.uid}/`), (snapshot) => {
				const data = snapshot.val();
				const tasks = [];

				for (let key in data) {
					tasks.push({ ...data[key], id: key });
				}

				setTasks(tasks);
			});
		}
	}, [user]);

	const {} = useKeyboardShortcut(
		['Escape'],
		(shortcutKeys) => {
			setAddTaskVisible(false);
			setUpdateTaskVisible(false);
			if (!addTaskVisible || !updateTaskVisible) {
				document.querySelector('[class="w-full h-full fc justify-center items-start gap-3"]').childNodes.forEach((el) => {
					el.classList.remove('bg-slate-200', 'dark:bg-slate-600');
					el.classList.add('bg-white', 'dark:bg-slate-700');
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
			}}
		>
			<AnimatePresence>{addTaskVisible && <AddTask set={() => setAddTaskVisible(false)} />}</AnimatePresence>
			<AnimatePresence>{updateTaskVisible && id !== '' && <UpdateTask id={id} set={() => setUpdateTaskVisible(false)} />}</AnimatePresence>
			<AnimatePresence mode="wait">
				<BrowserRouter>
					<Routes>
						<Route path="/just-do-it" element={<Landing />} />
						<Route path="/just-do-it/app" element={<Dashboard />} />
					</Routes>
				</BrowserRouter>
			</AnimatePresence>
		</FirebaseContext.Provider>
	);
}

export default App;
