// src/components/Movie/MovieRow.js
import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default ({ title, items, onPosterClick }) => {
  const [scrollX, setScrollX] = useState(0);

  const retroceder = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0) {
      x = 0;
    }
    setScrollX(x)
  }

  const avancar = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={retroceder}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={avancar}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{marginLeft: scrollX, width: items.results.length * 150}}>
          {items && items.results && items.results.length > 0 && items.results.map((item, key) => (
            <div key={key} className="movieRow--item" onClick={() => onPosterClick(item.id)}>
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
