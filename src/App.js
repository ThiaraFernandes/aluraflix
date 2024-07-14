// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./api/api";
import MovieRow from "./components/Movie/MovieRow";
import FeaturedMovie from "./components/Featured/FeaturedMovie";
import Header from "./components/Header/Header";
import TrailerModal from "./components/Modal/TrailerModal";
// import Profile from "./components/Profile/Profile";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      try {
        let list = await api.getHomeList();
        setMovieList(list);

        let originals = list.filter((i) => i.slug === "originals");
        if (
          originals.length > 0 &&
          originals[0].items &&
          originals[0].items.results.length > 0
        ) {
          let randomChosen = Math.floor(
            Math.random() * (originals[0].items.results.length - 1)
          );
          let chosen = originals[0].items.results[randomChosen];
          let chosenInfo = await api.getMovieInfo(chosen.id, "tv");
          setFeaturedData(chosenInfo);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setblackHeader(true);
      } else {
        setblackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleOpenModal = async (movieId) => {
    try {
      let trailerInfo = await api.getMovieTrailer(movieId);
      if (trailerInfo.results.length > 0) {
        let trailer = trailerInfo.results.find(trailer => trailer.type === 'Trailer');
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setModalOpen(true);
      } else {
        alert("Trailer não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar trailer:", error);
      alert("Erro ao carregar trailer.");
    }
  };

  const handleSearch = async (query) => {
    if (query.trim()) {
      try {
        let results = await api.searchMovies(query);
        setSearchResults(results.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }
  };

  // const addToFavorites = (movie) => {
  //   setFavoriteMovies(prevFavorites => [...prevFavorites, movie]);
  // };

  return (
    <div className="page">
      <Header black={blackHeader} onSearch={handleSearch} />

      {featuredData && <FeaturedMovie item={featuredData} onWatchClick={() => handleOpenModal(featuredData.id)} />}

      <section className="lists">
        {searchResults.length > 0 ? (
          <MovieRow title="Resultados da busca" items={{ results: searchResults }} onPosterClick={handleOpenModal}/>
        ) : (
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} onPosterClick={handleOpenModal}/>
          ))
        )}
      </section>

      {/* <Profile favoriteMovies={favoriteMovies} /> */}

      <footer className="footer">
        <img src="./logo.png" alt="logo" className="footer-image" /> <br />
        <span className="footer-text">Feito por{" "}<a href="https://github.com/ThiaraFernandes" target="_blank" rel="noopener noreferrer">Thiara Fernandes</a>
        </span><br />
        <span className="footer-text">Dados pegos do site Themoviedb.org</span>
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img src="./netflix-loading.gif" alt="carregando" />
        </div>
      )}

      <TrailerModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} videoUrl={trailerUrl} />
    </div>
  );
};
