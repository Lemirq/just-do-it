import { useEffect, useRef } from 'react';
import { BsGoogle } from 'react-icons/bs';
import { HiArrowSmRight } from 'react-icons/hi';
import Hero from './assets/Hero.png';

import { useScroll, useTransform, motion } from 'framer-motion';

const Landing = () => {
	const scrollRef = useRef(null);
	const gradientRef = useRef(null);

	const { scrollYProgress } = useScroll({
		ref: scrollRef,
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
	const xHero = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

	useEffect(() => {
		const handleMouseMove = (ev) => {
			if (!gradientRef.current) return;
			const { clientX, clientY } = ev;
			gradientRef.current.style.setProperty('--x', `${clientX}px`);
			gradientRef.current.style.setProperty('--y', `${clientY}px`);
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div className="bg-black relative w-full overflow-x-clip">
			<motion.section ref={scrollRef} style={{ opacity }} className="relative mb-[8rem] h-screen py-16 text-white">
				<motion.div style={{ scale, x: '-50%' }} className="fixed text-center left-1/2 z-10 fc items-center justify-center gap-6">
					<div>
						<h3 className="text-2xl font-bold">Just Do It</h3>
						<p className="text-xs text-gray-400">By Vihaan Sharma</p>
					</div>
					<h1 className="text-7xl font-bold">
						Your todo-list, <span className="text-violet-500">Reimagined.</span>
					</h1>
					<button className="px-5 py-2 fr justify-center text-lime-300 items-center gap-1 text-xl group">
						<BsGoogle className="mr-2" />
						Sign in with Google
						<span className="group-hover:translate-x-2 transition-transform">
							<HiArrowSmRight />
						</span>
					</button>
				</motion.div>
				<div
					ref={gradientRef}
					className="fixed inset-0 z-0 bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_#7b61ff_0%,_transparent_100%)] opacity-30"
				/>
			</motion.section>
			<div className="w-full fc justify-start items-center relative h-[300vh] z-20 mt-[-40vh]">
				<motion.img style={{ scale: scaleHero, x: xHero }} src={Hero} alt="Hero" className="sticky h-auto w-[70vw] top-20 rounded-lg" />
			</div>
		</div>
	);
};

export default Landing;
