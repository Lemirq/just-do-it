import React from 'react';
import { auth } from '../services/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
const Navbar = () => {
	const [signOut] = useSignOut(auth);
	const user = auth.currentUser;
	return (
		<div className="w-full py-6">
			<div className="fr justify-between items-center">
				<h1 className="text-2xl sm:text-3xl font-semibold italic tracking-tighter">Just Do It</h1>
				<div className="fr justify-between items-center gap-3">
					<p className="hidden sm:block text-xl">{user.displayName}</p>
					<div className="relative">
						<img
							src={user.photoURL}
							alt={user.displayName}
							className="w-10 h-10 rounded-full absolute outline-4 outline-white outline-offset-[-2px]"
						/>
						<button onClick={signOut} className="rounded-full px-7 pl-14 py-2 bg-violet-600 text-white">
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
