import { useContext, useEffect } from 'react';

import useKeyboardShortcut from '../services/useKeyboardShortcut';
import Navbar from '../components/Layout/Navbar';
import TaskList from '../components/Task/TaskList';
import Footer from '../components/Layout/Footer';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../services/FirebaseContext';
import Progress from '../components/Task/Progress';
import Search from '../components/Task/Search';
import Button from '../components/Common/Button';
import Help from '../components/Misc/Help';
import Select from 'react-select';
import { push, ref, remove } from 'firebase/database';
import { db } from '../services/firebase';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const filterOptions = [
	{ value: 'all', label: 'All Tasks' },
	{ value: 'incomplete', label: 'Incomplete' },
	{ value: 'complete', label: 'Complete' },
];

const Dashboard = () => {
	const navigate = useNavigate();

	const { selectedFilter, setSelectedFilter, setAddTaskVisible, user, setHelpVisible } = useContext(FirebaseContext);

	useEffect(() => {
		if (!user) {
			navigate('/');
		}
	}, [user]);
	useEffect(() => {
		setTimeout(() => {
			// detect what theme the user is using using media queries
			const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

			// if the user is using dark mode, set the theme to dark
			if (prefersDarkScheme.matches) {
				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#111827');
			} else {
				document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
			}

			document.body.classList.add(prefersDarkScheme.matches ? 'bg-slate-900' : 'bg-white');
		}, 500);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			const newColorScheme = e.matches ? 'dark' : 'light';
			document.body.classList.remove(newColorScheme === 'dark' ? 'bg-white' : 'bg-slate-900');
			document.querySelector('meta[name="theme-color"]').setAttribute('content', newColorScheme === 'dark' ? '#111827' : '#ffffff');
		});
	}, []);

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

	const {} = useKeyboardShortcut(
		['Shift', '?'],
		(shortcutKeys) => {
			setHelpVisible(true);
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

	const addSampleTasks = () => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => {
				let rand = Math.floor(Math.random() * 200);
				let tasks = [];
				data.splice(rand - 20, rand).forEach((task) => {
					let randome = Math.random();

					if (randome < 0.2) {
						tasks.push({ ...task, priority: 'none' });
					} else if (randome < 0.4) {
						tasks.push({ ...task, priority: 'low' });
					} else if (randome < 0.6) {
						tasks.push({ ...task, priority: 'medium' });
					} else if (randome < 0.8) {
						tasks.push({ ...task, priority: 'high' });
					} else {
						tasks.push({ ...task, priority: 'urgent' });
					}
				});
				tasks.forEach((task) => {
					push(ref(db, `/users/${user.uid}/`), {
						text: task.title,
						day: new Date().getTime(),
						status: task.completed ? 'complete' : 'incomplete',
						priority: task.priority,
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteAllTasks = () => {
		remove(ref(db, `/users/${user.uid}/`));
	};

	if (user) {
		return (
			<>
				<Toaster />
				<Navbar />
				<div className="fixed left-4 bottom-4 hidden xs:block" onClick={() => setHelpVisible(true)}>
					<AiOutlineQuestionCircle size={30} className="text-zinc-300 cursor-pointer" />
				</div>
				<motion.div
					initial={{ scale: 0.2 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.2 }}
					id="dashboard"
					style={{
						WebkitTapHighlightColor: 'transparent',
					}}
					className="w-screen h-screen max-w-6xl mx-auto fc items-center justify-start px-4 sm:px-10 font-rubik overflow-x-hidden scrollbar-hide relative dark:bg-slate-900 dark:text-white pt-52"
				>
					<h1 className="text-5xl font-medium mb-4 tracking-tighter">
						{greeting()}, {user.displayName.split(' ')[0]}
					</h1>
					<div className="fr justify-evenly items-center w-full sm:justify-between">
						<Button type="primary" onClick={() => setAddTaskVisible(true)}>
							Add Task <span className="hidden sm:block text-sm text-zinc-300">Shift + A</span>
						</Button>
						<Progress />
						<Select
							defaultValue={filterOptions[0]}
							isSearchable={window.innerWidth >= 768 ? true : false}
							options={filterOptions}
							classNames={{
								control: (provided) => {
									return `select-control ${provided.className}`;
								},

								menu: () => {
									return `select-menu`;
								},

								menuList: (provided) => {
									return `select-menu-list ${provided.className}`;
								},

								option: (provided) => {
									return `select-option ${provided.isSelected ? 'is-selected' : ''} ${provided.className}`;
								},

								singleValue: (provided) => {
									return `select-single-value ${provided.className}`;
								},

								input: (provided) => {
									return `select-input ${provided.className}`;
								},
							}}
							name="filter"
							id="filter"
							value={selectedFilter}
							// get the value of the selected option
							onChange={(e) =>
								setSelectedFilter({ value: e.value, label: filterOptions.find((option) => option.value === e.value).label })
							}
						/>
					</div>
					<Search />
					<TaskList />
					<Footer />
					{/* TESTING */}
					<div className="fixed bottom-0 right-0 mr-3 mb-3 cursor-pointer">
						<div onClick={addSampleTasks}>
							<p>Add sample tasks</p>
						</div>
						<div onClick={deleteAllTasks}>
							<p>Delete all tasks</p>
						</div>
					</div>
				</motion.div>
			</>
		);
	}
};

export default Dashboard;
