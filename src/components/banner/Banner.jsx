import React from 'react';
import useSWR from 'swr';
import { fetcher } from 'apiConfig/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from 'components/button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=24714b5c2fbb69e7092a890ccf38e191`,
		fetcher
	);

	const movies = data?.results || [];
	// console.log('🚀 ~ Banner ~ movies', movies);

	return (
		<section className="banner h-[500px] page-container mb-20 overflow-hidden">
			<Swiper grabCursor={'true'} slidesPerView={'auto'}>
				{movies.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<BannerItem data={item}></BannerItem>
						</SwiperSlide>
					))}
			</Swiper>
		</section>
	);
};

const BannerItem = ({ data }) => {
	const navigate = useNavigate();
	const { title, poster_path, id } = data;
	return (
		<div className="relative w-full h-full rounded-lg">
			<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>

			<img
				src={`https://image.tmdb.org/t/p/original${poster_path}`}
				alt=""
				className="object-cover object-center w-full h-full rounded-lg"
			/>

			<div className="absolute w-full text-white bottom-5 left-5">
				<h2 className="mb-5 text-3xl font-bold">{title}</h2>
				<div className="flex items-center mb-8 gap-x-3">
					<span className="px-4 py-2 border border-white rounded-md">
						Adventure
					</span>
					<span className="px-4 py-2 border border-white rounded-md">
						Adventure
					</span>
					<span className="px-4 py-2 border border-white rounded-md">
						Adventure
					</span>
				</div>

				{/* <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
					Watch Now
				</button> */}
				<Button onClick={() => navigate(`/movies/${id}`)} bgColor="primary">
					Watch Now
				</Button>
			</div>
		</div>
	);
};

export default Banner;
