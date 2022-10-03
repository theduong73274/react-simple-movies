import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import MovieCard from './MovieCard';

// https://api.themoviedb.org/3/movie/now_playing?api_key=24714b5c2fbb69e7092a890ccf38e191
// https://api.themoviedb.org/3/movie/popular?api_key=
const MovieList = ({ type = 'now_playing' }) => {
	const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
	const movies = data?.results || [];

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
