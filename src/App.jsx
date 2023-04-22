import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './services/firebase';
import TaskList from './components/TaskList';
import { FirebaseContext } from './services/FirebaseContext';
import AddTask from './components/AddTask';
import { AnimatePresence } from 'framer-motion';
import UpdateTask from './components/UpdateTask';
import { Toaster } from 'react-hot-toast';
import Welcome from './components/Welcome';
function App() {
	const [tasks, setTasks] = useState([]);
	const [updateTaskVisible, setUpdateTaskVisible] = useState(false);
	const [id, setId] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('all');
	const [addTaskVisible, setAddTaskVisible] = useState(false);

	useEffect(() => {
		onValue(ref(db, '/tasks/'), (snapshot) => {
			const data = snapshot.val();
			const tasks = [];

			for (let key in data) {
				tasks.push({ ...data[key], id: key });
			}

			setTasks(tasks);
		});
	}, []);

	return <Welcome />;
	// return (
	// 	<FirebaseContext.Provider value={{ tasks, updateTaskVisible, setUpdateTaskVisible, id, setId }}>
	// 		<Toaster />
	// 		<AnimatePresence>{addTaskVisible && <AddTask set={() => setAddTaskVisible(false)} />}</AnimatePresence>
	// 		<AnimatePresence>{updateTaskVisible && id !== '' && <UpdateTask id={id} set={() => setUpdateTaskVisible(false)} />}</AnimatePresence>
	// 		<div className="w-screen min-h-screen fc items-center justify-start pt-24 px-10">
	// 			<h1 className="text-5xl font-medium">Todo List</h1>
	// 			<div className="fr justify-between items-center w-full">
	// 				<button className="px-7 py-2 rounded-lg bg-violet-600 text-white mt-3" onClick={(e) => setAddTaskVisible(true)}>
	// 					Add Task
	// 				</button>
	// 				<select
	// 					className="px-7 py-2 rounded-lg bg-slate-200 text-black mt-3"
	// 					name="filter"
	// 					id="filter"
	// 					value={selectedFilter}
	// 					onChange={(e) => setSelectedFilter(e.target.value)}
	// 				>
	// 					<option value="all">All</option>
	// 					<option value="incomplete">Incomplete</option>
	// 					<option value="complete">Complete</option>
	// 				</select>
	// 			</div>

	// 			<TaskList />
	// 		</div>
	// 	</FirebaseContext.Provider>
	// );
}

export default App;
