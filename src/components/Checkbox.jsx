import { useState } from 'react';
import { animated, useSpring, useChain, useSpringRef } from 'react-spring';

function Checkbox({ defaultChecked, onChange }) {
	const [isChecked, setIsChecked] = useState(defaultChecked);
	const [checkmarkLength, setCheckmarkLength] = useState(null);

	const checkboxAnimationRef = useSpringRef();

	const checkboxAnimationStyle = useSpring({
		backgroundColor: isChecked ? 'rgb(124, 58, 237)' : '#fff',
		borderColor: isChecked ? 'rgb(124, 58, 237)' : '#ddd',
		ref: checkboxAnimationRef,
	});

	const checkmarkAnimationRef = useSpringRef();

	const checkmarkAnimationStyle = useSpring({
		x: isChecked ? 0 : checkmarkLength,
		ref: checkmarkAnimationRef,
	});
	useChain(
		isChecked ? [checkboxAnimationRef, checkmarkAnimationRef] : [checkmarkAnimationRef, checkboxAnimationRef],
		[0, 0.1] // -> delay by 0.1 seconds
	);
	return (
		<>
			<input
				type="checkbox"
				onChange={(e) => {
					setIsChecked(!isChecked);
					onChange(e.target.checked);
				}}
				defaultChecked={defaultChecked}
			/>
			<animated.svg
				style={checkboxAnimationStyle}
				className={`inline-block h-6 w-6 bg-white border-2 border-gray-300 mr-1 rounded-md p-[2px] cursor-pointer ${
					isChecked ? 'bg-violet-600 border-violet-600' : ''
				}`}
				// This element is purely decorative so
				// we hide it for screen readers
				aria-hidden="true"
				viewBox="0 0 15 11"
				fill="none"
			>
				<animated.path
					ref={(ref) => {
						if (ref) {
							setCheckmarkLength(ref.getTotalLength());
						}
					}}
					stroke="#fff"
					strokeDasharray={checkmarkLength}
					strokeDashoffset={checkmarkAnimationStyle.x}
					d="M1 4.5L5 9L14 1"
					strokeWidth="2"
				/>
			</animated.svg>
		</>
	);
}

export default Checkbox;
