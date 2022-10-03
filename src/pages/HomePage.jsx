import React from 'react';
import MovieList from '../components/movie/MovieList';

const HomePage = () => {
	return (
		<>
			<section className="pb-20 mb-10 movies-layout page-container">
				<h2 className="mb-10 text-3xl font-bold text-white capitalize">
					Now playing
				</h2>

				<MovieList type="now_playing"></MovieList>
			</section>

			<section className="pb-20 mb-10 movies-layout page-container">
				<h2 className="mb-10 text-3xl font-bold text-white capitalize">
					Top rated
				</h2>

				<MovieList type={'top_rated'}></MovieList>
			</section>

			<section className="pb-20 mb-10 movies-layout page-container">
				<h2 className="mb-10 text-3xl font-bold text-white capitalize">
					Trending
				</h2>

				<MovieList type={'popular'}></MovieList>
				{/* UI Demo */}
				{/* <div className="grid grid-cols-4 gap-10 move-list">
					<div className="p-3 text-white rounded-lg movie-card bg-slate-800">
						<img
							src="https://vtv1.mediacdn.vn/zoom/700_438/2019/4/26/poster-payoff-1-1556273680151870157160-crop-1556273779257196175768.jpg"
							alt=""
							className="w-full h-[250px] object-cover rounded-lg mb-5"
						/>

						<h3 className="mb-3 text-xl font-bold">Spiderman: Homecoming</h3>

						<div className="flex items-center justify-between mb-10 text-sm opacity-50">
							<span>2017</span>
							<span>7.4</span>
						</div>

						<button className="w-full px-6 py-3 capitalize rounded-lg bg-primary">
							Watch now
						</button>
					</div>
				</div> */}
			</section>
		</>
	);
};

export default HomePage;
