import React from 'react';
import Modal from '../Common/Modal';
const Help = ({ close }) => {
	const shortcuts = [
		{
			name: 'Add Todo',
			key: 'Shift + A',
		},
		{
			name: 'Select Previous Todo',
			key: '↑',
		},
		{
			name: 'Select Next Todo',
			key: '↓',
		},
		{
			name: 'Toggle Todo Completion',
			key: 'Space',
		},
		{
			name: 'Delete Todo',
			key: 'Shift + Backspace',
		},
		{
			name: 'Edit Todo',
			key: 'Shift + Enter',
		},
		{
			name: 'Close Popup',
			key: 'Escape',
		},
		{
			name: 'Toggle Help',
			key: 'Shift + ?',
		},
	];

	return (
		<Modal
			close={close}
			cClassName={'w-[90%] max-w-7xl sm:w-1/2 bg-slate-200 dark:bg-slate-800 dark:text-white rounded-lg z-10 px-7 sm:px-10 py-7'}
		>
			<h3 className="sm:text-2xl text-3xl mb-6">Keyboard Shortcuts</h3>
			<div className="w-full fc justify-center items-start gap-3">
				{shortcuts.map((shortcut, i) => (
					<div className="w-full" key={i}>
						<div className="w-full fr justify-between items-center">
							<p className="mb-2 text-lg">{shortcut.name}</p>
							<p className="mb-2 text-lg">{shortcut.key}</p>
						</div>
						<div className="w-full h-[1px] bg-slate-400 dark:bg-slate-600" />
					</div>
				))}
			</div>
		</Modal>
	);
};

export default Help;
