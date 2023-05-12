import { useContext } from 'react';
import { FirebaseContext } from '../../services/FirebaseContext';

const Search = () => {
	const { search, setSearch } = useContext(FirebaseContext);

	return (
		<form className="flex items-center justify-center w-full mt-5">
			<input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				type="text"
				placeholder="Search"
				className="w-full px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 transition-colors outline-none text-2xl"
			/>
		</form>
	);
};

export default Search;
