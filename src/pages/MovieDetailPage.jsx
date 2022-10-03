import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard from 'components/movie/MovieCard';
import { fetcher, tmdbAPI } from 'apiConfig/config';

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
					className="w-full h-full bg-center bg-no-repeat bg-cover"
					style={{
						backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
					}}
				></div>
			</div>

			<div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
				<img
					src={tmdbAPI.imageOriginal(poster_path)}
					className="object-cover object-center w-full h-full rounded-xl"
					alt=""
				/>
			</div>

			<h1 className="mb-10 text-3xl font-bold text-center text-white">
				{title}
			</h1>

			{genres.length > 0 && (
				<div className="flex items-center justify-center mb-10 gap-x-7 ">
					{genres.map((item) => (
						<span
							key={item.id}
							className="px-4 py-2 border rounded border-primary text-primary"
						>
							{item.name}
						</span>
					))}
				</div>
			)}

			<p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
				{overview}
			</p>
			<MovieMeta type="credits"></MovieMeta>
			<MovieMeta type="videos"></MovieMeta>
			<MovieMeta type="similar"></MovieMeta>

			{/* <MovieCredits></MovieCredits> */}
			{/* <MoviesVideos></MoviesVideos> */}
			{/* <MoviesSimilar></MoviesSimilar> */}
		</div>
	);
};

function MovieMeta({ type = 'videos' }) {
	const { moviesId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(moviesId, type), fetcher);
	if (!data) return null;
	// console.log('🚀 ~ MoviesVideos ~ data', data);

	if (type === 'credits') {
		const { cast } = data;
		if (!cast || cast.length <= 0) return null;

		return (
			<div className="py-10">
				<h2 className="mb-10 text-3xl text-center">Casts</h2>
				<div className="grid grid-cols-4 gap-5">
					{cast.slice(0, 4).map((item) => (
						<div className="cart-item" key={item.id}>
							<img
								src={tmdbAPI.imageOriginal(item.profile_path)}
								className="w-full h-[350px] object-cover rounded-lg mb-3"
								alt=""
							/>
							<h3 className="text-xl font-medium text-center">{item.name}</h3>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		const { results } = data;
		if (!results || results.length <= 0) return null;

		if (type === 'videos') {
			return (
				<div className="py-10">
					<div className="flex flex-col gap-10">
						{results.slice(0, 2).map((item) => (
							<div key={item.id}>
								<h3 className="inline-block p-3 mb-5 text-xl font-medium text-white bg-secondary">
									{item.name}
								</h3>

								<div className="w-full aspect-video">
									<iframe
										width="903"
										height="508"
										src={`https://www.youtube.com/embed/${item.key}`}
										title="Videos"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										className="object-fill w-full h-full"
									></iframe>
								</div>
							</div>
						))}
					</div>
				</div>
			);
		}

		if (type === 'similar') {
			return (
				<div className="py-10">
					<h2 className="mb-10 text-3xl font-medium">Similar movies</h2>

					<div className="movie-list">
						<Swiper
							grabCursor={'true'}
							slidesPerView={'auto'}
							spaceBetween={40}
						>
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
		}
	}

	return null;
}

// const MovieCredits = () => {
// 	const { moviesId } = useParams();
// 	const { data } = useSWR(tmdbAPI.getMovieMeta(moviesId, 'credits'), fetcher);

// 	if (!data) return null;
// 	const { cast } = data;
// 	if (!cast || cast.length <= 0) return null;

// 	return (
// 		<div className="py-10">
// 			<h2 className="mb-10 text-3xl text-center">Casts</h2>
// 			<div className="grid grid-cols-4 gap-5">
// 				{cast.slice(0, 4).map((item) => (
// 					<div className="cart-item" key={item.id}>
// 						<img
// 							src={tmdbAPI.imageOriginal(item.profile_path)}
// 							className="w-full h-[350px] object-cover rounded-lg mb-3"
// 							alt=""
// 						/>
// 						<h3 className="text-xl font-medium text-center">{item.name}</h3>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// const MoviesVideos = () => {
// 	const { moviesId } = useParams();
// 	const { data } = useSWR(tmdbAPI.getMovieMeta(moviesId, 'videos'), fetcher);

// 	if (!data) return null;
// 	// console.log('🚀 ~ MoviesVideos ~ data', data);
// 	const { results } = data;
// 	if (!results || results.length <= 0) return null;

// 	return (
// 		<div className="py-10">
// 			<div className="flex flex-col gap-10">
// 				{results.slice(0, 2).map((item) => (
// 					<div key={item.id}>
// 						<h3 className="inline-block p-3 mb-5 text-xl font-medium text-white bg-secondary">
// 							{item.name}
// 						</h3>

// 						<div className="w-full aspect-video">
// 							<iframe
// 								width="903"
// 								height="508"
// 								src={`https://www.youtube.com/embed/${item.key}`}
// 								title="Videos"
// 								frameBorder="0"
// 								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 								allowFullScreen
// 								className="object-fill w-full h-full"
// 							></iframe>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// const MoviesSimilar = () => {
// 	const { moviesId } = useParams();
// 	const { data } = useSWR(tmdbAPI.getMovieMeta(moviesId, 'similar'), fetcher);

// 	if (!data) return null;
// 	console.log('🚀 ~ MoviesSimilar ~ data', data);
// 	const { results } = data;
// 	if (!results || results.length <= 0) return null;

// 	return (
// 		<div className="py-10">
// 			<h2 className="mb-10 text-3xl font-medium">Similar movies</h2>

// 			<div className="movie-list">
// 				<Swiper grabCursor={'true'} slidesPerView={'auto'} spaceBetween={40}>
// 					{results.length > 0 &&
// 						results.map((item) => (
// 							<SwiperSlide key={item.id}>
// 								<MovieCard data={item}></MovieCard>
// 							</SwiperSlide>
// 						))}
// 				</Swiper>
// 			</div>
// 		</div>
// 	);
// };

export default MovieDetailPage;
