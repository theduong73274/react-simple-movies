import { fetcher, tmdbAPI } from 'apiConfig/config';
import MovieCard from 'components/movie/MovieCard';
import useDebounce from 'Hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { v4 } from 'uuid';
import Button from '../components/button/Button';
import { MovieCardSkeleton } from '../components/movie/MovieCard';

// Load More
const itemsPerPage = 20;

const MoviePageV2 = () => {
	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState('');
	const [url, setUrl] = useState(tmdbAPI.getMovieList('popular', nextPage));
	const filterDebounce = useDebounce(filter, 500);

	const { data, error, size, setSize } = useSWRInfinite(
		(index) => url.replace('page=1', `page=${index + 1}`),
		fetcher
	);

	const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
	const loading = !data && !error;

	const isEmpty = data?.[0]?.results.length === 0;
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);

	// console.log('🚀 ~ MoviePageV2 ~ isReachingEnd', isReachingEnd);

	useEffect(() => {
		if (filterDebounce) {
			setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
		} else {
			setUrl(tmdbAPI.getMovieList('popular', nextPage));
		}
	}, [filterDebounce, nextPage]);

	const handlerOnChange = (e) => {
		setFilter(e.target.value);
	};

	return (
		<div className="py-10 page-container">
			<div className="flex mb-10 overflow-hidden rounded-md">
				<div className="flex-1">
					<input
						type="text"
						className="w-full p-4 text-white outline-none bg-slate-800"
						placeholder="Type here to search ..."
						onChange={handlerOnChange}
					/>
				</div>

				<button className="p-4 text-white bg-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</button>
			</div>

			{/* {loading && (
				<div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
			)} */}

			{loading && (
				<div className="grid grid-cols-3 gap-10">
					{new Array(itemsPerPage).fill(0).map(() => (
						<MovieCardSkeleton key={v4()}></MovieCardSkeleton>
					))}
					<MovieCardSkeleton></MovieCardSkeleton>
					<MovieCardSkeleton></MovieCardSkeleton>
					<MovieCardSkeleton></MovieCardSkeleton>
				</div>
			)}

			<div className="grid grid-cols-3 gap-10">
				{!loading &&
					movies.length > 0 &&
					movies.map((item) => (
						<MovieCard key={item.id} data={item}></MovieCard>
					))}
			</div>

			<div className="mt-10 text-center">
				<Button
					onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
					disabled={isReachingEnd}
					className={`${isReachingEnd ? 'bg-slate-300' : ''}`}
				>
					Load more
				</Button>
			</div>
		</div>
	);
};

export default MoviePageV2;
