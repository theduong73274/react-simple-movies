import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import MovieCard from './MovieCard';

// https://api.themoviedb.org/3/movie/now_playing?api_key=24714b5c2fbb69e7092a890ccf38e191
// https://api.themoviedb.org/3/movie/popular?api_key=
const MovieList = ({ type = 'now_playing' }) => {
	const [movies, setMovies] = useState([]);
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${type}?api_key=24714b5c2fbb69e7092a890ccf38e191`,
		fetcher
	);

	useEffect(() => {
		if (data && data.results) setMovies(data.results);
	}, [data]);

	return (
		<div className="movie-list">
			<Swiper grabCursor={'true'} slidesPerView={'auto'} spaceBetween={40}>
				{movies.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<MovieCard data={item}></MovieCard>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default MovieList;
