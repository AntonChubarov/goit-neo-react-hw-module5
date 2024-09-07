import axios from 'axios';

const API_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODkwMDViMWVjMzZjZGIwZDhkNjE5M2Y4ZDdlNzAwMCIsIm5iZiI6MTcyNTY2OTM3MC4zOTM1NjYsInN1YiI6IjY2ZGI5ZTBmOTI0NWVhYmM1YjQ5NTliNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d-GWpLbZ_8wWDEH73JbbU9gaHaADox1U3npWnlmxLdI';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});

export const getMoviesByQuery = async (query) => {
    const params = { include_adult: false, page: 1, query };
    const response = await axiosInstance.get('search/movie', { params });
    return response.data.results;
};

export const getTrendingMovies = async () => {
    const response = await axiosInstance.get('trending/movie/day');
    return response.data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await axiosInstance.get(`movie/${movieId}`);
    return response.data;
};

export const getMovieCast = async (movieId) => {
    const response = await axiosInstance.get(`movie/${movieId}/credits`);
    return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
    const response = await axiosInstance.get(`movie/${movieId}/reviews`);
    return response.data.results;
};
