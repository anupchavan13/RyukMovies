import React, { useEffect, useState, useMemo } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { fetchMovieTrending } from './fetch/movieDataAPI';
import './style/Slider.scss';

const Slider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgUrl = 'https://image.tmdb.org/t/p/w1280/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingData = await fetchMovieTrending();
        setData(trendingData);
      } catch (err) {
        setError('Failed to fetch trending movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items = useMemo(() => {
    if (!data.length) return [];

    return data.slice(0, 6).map((item) => (
      <div className="slider-item" key={item.id}>
        <div
          className="slider-content"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 8, 20, .5), rgba(0, 8, 20, .8), rgba(0, 8, 20, 1)), url(${imgUrl}${item.backdrop_path})` }}
        >
          <h2>
            {item.title}
            <br />
            <span movie_id={item.id} movie_name={item.title}>Details<i /></span>
          </h2>
        </div>
      </div>
    ));
  }, [data, imgUrl]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="slider-container">
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={3000}
        animationType="slide"
        infinite
        controlsStrategy="responsive"
        responsive={{
          0: { items: 1 },
        }}
      />
    </div>
  );
};

export default Slider;
