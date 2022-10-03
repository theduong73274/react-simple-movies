import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'swiper/scss';
import Banner from './components/banner/Banner';
import Main from './components/layout/Main';
// import MoviePageV2 from './pages/MoviePageV2';
// import HomePage from './pages/HomePage';
// import MoviePage from './pages/MoviePage';
// import MovieDetailPage from './pages/MovieDetailPage';

// dynamic import
const HomePage = lazy(() => import('./pages/HomePage'));
// const MoviePage = lazy(() => import('./pages/MoviePage'));
const MoviePageV2 = lazy(() => import('./pages/MoviePageV2'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));

function App() {
	return (
		<Fragment>
			<Suspense fallback={<></>}>
				<Routes>
					<Route element={<Main></Main>}>
						<Route
							path="/"
							element={
								<>
									<Banner></Banner>
									<HomePage></HomePage>
								</>
							}
						></Route>

						{/* <Route path="/movies" element={<MoviePage></MoviePage>}></Route> */}
						<Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
						<Route
							path="/movies/:moviesId"
							element={<MovieDetailPage></MovieDetailPage>}
						></Route>
						<Route path="*" element={<>Not found</>}></Route>
					</Route>
				</Routes>
			</Suspense>
		</Fragment>
	);
}

export default App;
