import React from "react";
import './Header.css';
import SearchBar from './SearchBar';

export default ({black, onSearch}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <img src="/logo.png" alt=" Logo da Aluraflix"></img>
            </div>
            <SearchBar onSearch={onSearch} />

            <div className="header--user">
                <a href="/">
                    <img src="/user.png" alt="Logo do usuário" />
                </a>
            </div>
        </header>
    )
}