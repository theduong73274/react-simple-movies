import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard from '../components/movie/MovieCard';
import { apiKey, fetcher, tmdbAPI } from '../config';

const MovieDetailPage = () => {
	const { moviesId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieDetail(moviesId), fetcher);

	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;
	// console.log('🚀 ~ MovieDetailPage ~ data', data);

	return (
		<div className="pb-10">
			<div className="w-full h-[500px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-70"></div>
				<div
					className="w-full h-full bg-cover bg-no-repeat bg-center"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
					}}
				></div>
			</div>

			<div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
				<img
					src={`https://image.tmdb.org/t/p/original${poster_path}`}
					className="w-full h-full object-cover object-center rounded-xl"
					alt=""
				/>
			</div>

			<h1 className="text-center text-3xl font-bold text-white mb-10">
				{title}
			</h1>

			{genres.length > 0 && (
				<div className="flex items-center justify-center gap-x-7 mb-10 ">
					{genres.map((item) => (
						<span
							key={item.id}
							className="py-2 px-4 border-primary text-primary border rounded"
						>
							{item.name}
						</span>
					))}
				</div>
			)}

			<p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
				{overview}
			</p>
			<MovieCredits></MovieCredits>
			<MoviesVideos></MoviesVideos>
			<MoviesSimilar></MoviesSimilar>
		</div>
	);
};

const MovieCredits = () => {
	const { moviesId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(moviesId, 'credits'), fetcher);

	if (!data) return null;
	const { cast } = data;
	if (!cast || cast.length <= 0) return null;

	return (
		<div className="py-10">
			<h2 className="text-center text-3xl mb-10">Casts</h2>
			<div className="grid grid-cols-4 gap-5">
				{cast.slice(0, 4).map((item) => (
					<div className="cart-item" key={item.id}>
						<img
							src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
							className="w-full h-[350px] object-cover rounded-lg mb-3"
							alt=""
						/>
						<h3 className="text-xl text-center font-medium">{item.name}</h3>
					</div>
				))}
			</div>
		</div>
	);
};

const MoviesVideos = () => {
	const { moviesId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(moviesId, 'videos'), fetcher);

	if (!data) return null;
	// console.log('🚀 ~ MoviesVideos ~ data', data);
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<div className="flex flex-col gap-10">
				{results.slice(0, 2).map((item) => (
					<div key={item.id}>
						<h3
							className="mb-5 text-xl font-medium text-white p-3 bg-secondary
                        inline-block"
						>
							{item.name}
						</h3>

						<div className="w-full aspect-video">
							<iframe
								width="903"
								height="508"
								src={`https://www.youtube.com/embed/${item.key}`}
								title="HẠ CÒN VƯƠNG NẮNG | DATKAA x KIDO x Prod. QT BEATZ [OFFICIAL MUSIC VIDEO]"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full object-fill"
							></iframe>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const MoviesSimilar = () => {
	const { moviesId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${moviesId}/similar?api_key=${apiKey}`,
		fetcher
	);
	if (!data) return null;
	console.log('🚀 ~ MoviesSimilar ~ data', data);
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<h2 className="text-3xl font-medium mb-10">Similar movies</h2>

			<div className="movie-list">
				<Swiper grabCursor={'true'} slidesPerView={'auto'} spaceBetween={40}>
					{results.length > 0 &&
						results.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard data={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default MovieDetailPage;
