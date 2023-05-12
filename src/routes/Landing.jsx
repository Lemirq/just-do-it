import { useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { FirebaseContext } from '../services/FirebaseContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
const Landing = () => {
	const { signInWithGoogle, user, loading } = useContext(FirebaseContext);
	const handleSignIn = () => {
		signInWithGoogle();
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/app');
		}
	}, [user]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!user) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="w-screen h-screen fc justify-center items-center bg text-white px-3"
			>
				<h1 className="text-5xl md:text-7xl italic font-semibold tracking-tighter mb-4">Just Do It</h1>
				<div className="max-w-lg text-center fc justify-center items-center gap-3">
					<p className="text-xl font-bold">Just do it is a simple, cloud-based todo app that allows you to add, update and delete tasks.</p>
					<p className="text-sm md:text-lg">It is completely free and your data is stored securely in the cloud.</p>
					<motion.button
						onClick={handleSignIn}
						whileHover={{ scale: 1.1 }}
						initial={{ scale: 1 }}
						className="px-5 py-3 bg-zinc-800 fr rounded-full justify-center items-center gap-2 text-xl box"
					>
						<FcGoogle />
						Sign In With Google
					</motion.button>
				</div>
			</motion.div>
		);
	}
};

export default Landing;
