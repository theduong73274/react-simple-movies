export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = '24714b5c2fbb69e7092a890ccf38e191';
const tmdbEndpoint = 'https://api.themoviedb.org/3/movie';
const tmdbEndpointSearch = 'https://api.themoviedb.org/3/search/movie';

export const tmdbAPI = {
	getMovieList: (type, page = 1) =>
		`${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
	getMovieDetail: (moviesId) => `${tmdbEndpoint}/${moviesId}?api_key=${apiKey}`,
	getMovieMeta: (moviesId, type) =>
		`${tmdbEndpoint}/${moviesId}/${type}?api_key=${apiKey}`,
	getMovieSearch: (query, page) =>
		`${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
	imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
	image500: (url) => `https://image.tmdb.org/t/p/w500${url}`,
};
