export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = '24714b5c2fbb69e7092a890ccf38e191';
const tmdbEndpoint = 'https://api.themoviedb.org/3/movie';

export const tmdbAPI = {
	getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
	getMovieDetail: (moviesId) => `${tmdbEndpoint}/${moviesId}?api_key=${apiKey}`,
	getMovieMeta: (moviesId, type) =>
		`${tmdbEndpoint}/${moviesId}/${type}?api_key=${apiKey}`,
};
