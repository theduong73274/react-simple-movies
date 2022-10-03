import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from 'apiConfig/config';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

// https://api.themoviedb.org/3/movie/now_playing?api_key=24714b5c2fbb69e7092a890ccf38e191
// https://api.themoviedb.org/3/movie/popular?api_key=
const MovieList = ({ type = 'now_playing' }) => {
	const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
	const isLoading = !data && !error;
	const movies = data?.results || [];

	return (
		<div className="movie-list">
			{isLoading && (
				<>
					<Swiper grabCursor={'true'} slidesPerView={'auto'} spaceBetween={40}>
						<SwiperSlide>
							<MovieCardSkeleton></MovieCardSkeleton>
						</SwiperSlide>
						<SwiperSlide>
							<MovieCardSkeleton></MovieCardSkeleton>
						</SwiperSlide>
						<SwiperSlide>
							<MovieCardSkeleton></MovieCardSkeleton>
						</SwiperSlide>
						<SwiperSlide>
							<MovieCardSkeleton></MovieCardSkeleton>
						</SwiperSlide>
						<SwiperSlide>
							<MovieCardSkeleton></MovieCardSkeleton>
						</SwiperSlide>
					</Swiper>
				</>
			)}

			{!isLoading && (
				<Swiper grabCursor={'true'} slidesPerView={'auto'} spaceBetween={40}>
					{movies.length > 0 &&
						movies.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard data={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</div>
	);
};

MovieList.propTypes = {
	type: PropTypes.string.isRequired,
};

function FallbackComponent() {
	return (
		<p className="text-red-400 bg-red-50">
			Something went wrong with this components
		</p>
	);
}

export default withErrorBoundary(MovieList, {
	FallbackComponent,
});
