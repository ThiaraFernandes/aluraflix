import React from "react";
import "./FeaturedMovie.css";
import { FaPlay } from "react-icons/fa";

export default ({ item, onWatchClick }) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name); 
    }

    let description = item.overview;
    if(description.lenght > 200) {
        description = description.substring(0, 200)+'...';
    }

    return (
      <section
        className="featured"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
          backgroundPosition: "center",
        }}
      >
        <div className="featured--vertical">
          <div className="featured--horizontal">
            <div className="featured--name">{item.original_name}</div>
            <div className="featured--info">
              <div className="featured--points">{item.vote_average} pontos</div>
              <div className="featured--year">{firstDate.getFullYear()}</div>
              <div className="featured--seasons">
                {item.number_of_seasons} temporada{""}
                {item.number_of_seasons !== 1 ? "s" : ""}
              </div>
              <div className="featured--description">{description}</div>
              <div className="featured--buttons">
                  <button onClick={onWatchClick} className="featured--watchbutton"> <FaPlay /> Assistir</button>
                  <a href={`/list/add/${item.id}`} className="featured--listabutton">+ Minha Lista</a>
              </div>
              <div className="featured--genres"><strong>Gênero:</strong> {genres.join(', ')}</div>
            </div>
          </div>
        </div>
      </section>
    );
  };