import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/Trending.scss';
import MovieCard from './card/moviecard/MovieCard';

const Trending = () => {
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = '75e4d71b41e04f2676aac7bb4d77872b'; // Consider moving to environment variables

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
                    params: { api_key: apiKey, language: 'en-US' },
                });
                setMovieData(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [apiKey]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return (
        <div className='trending-movies'>
            <h2>Trending Movies</h2>
            <div className="movie-list">
                {movieData.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Trending;
