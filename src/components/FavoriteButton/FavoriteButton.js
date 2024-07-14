
import React, { useState } from 'react';

const FavoriteButton = ({ itemId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    // Verifica se o item já está nos favoritos
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(itemId);

    if (index === -1) {
      // Adiciona o item aos favoritos
      favorites.push(itemId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      // Remove o item dos favoritos
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(false);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
    </button>
  );
};

export default FavoriteButton;
