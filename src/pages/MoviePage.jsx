import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import MovieCard from '../components/movie/MovieCard';
import { fetcher } from '../config';
import useDebounce from '../Hooks/useDebounce';

const itemsPerPage = 20;

const MoviePage = () => {
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState('');
	const [url, setUrl] = useState(
		`https://api.themoviedb.org/3/movie/popular?api_key=24714b5c2fbb69e7092a890ccf38e191&page=${nextPage}`
	);
	const filterDebounce = useDebounce(filter, 500);

	const { data, error } = useSWR(url, fetcher);
	const loading = !data && !error;

	useEffect(() => {
		if (filterDebounce) {
			setUrl(
				`https://api.themoviedb.org/3/search/movie?api_key=24714b5c2fbb69e7092a890ccf38e191&query=${filterDebounce}&page=${nextPage}`
			);
		} else {
			setUrl(
				`https://api.themoviedb.org/3/movie/popular?api_key=24714b5c2fbb69e7092a890ccf38e191&page=${nextPage}`
			);
		}
	}, [filterDebounce, nextPage]);
	const handlerOnChange = (e) => {
		setFilter(e.target.value);
	};

	const movies = data?.results || [];
	// if (!data) return null;
	// const { page, total_pages } = data;

	useEffect(() => {
		if (!data || !data.total_pages) return;
		const endOffset = itemOffset + itemsPerPage;
		setPageCount(Math.ceil(data.total_pages / itemsPerPage));
	}, [data, itemOffset]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.total_pages;
		setItemOffset(newOffset);
		setNextPage(event.selected + 1);
	};

	return (
		<div className="py-10 page-container">
			<div className="flex mb-10 rounded-md overflow-hidden">
				<div className="flex-1">
					<input
						type="text"
						className="w-full p-4 bg-slate-800 text-white outline-none"
						placeholder="Type here to search ..."
						onChange={handlerOnChange}
					/>
				</div>

				<button className="p-4 bg-primary text-white">
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

			{loading && (
				<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
			)}

			<div className="grid grid-cols-3 gap-10">
				{!loading &&
					movies.length > 0 &&
					movies.map((item) => (
						<MovieCard key={item.id} data={item}></MovieCard>
					))}
			</div>

			<div className="mt-10">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					className="pagination"
				/>
			</div>
		</div>
	);
};

export default MoviePage;
