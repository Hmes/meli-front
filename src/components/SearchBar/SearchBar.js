import React, { useRef } from 'react';
import './SearchBar.scss';
import logo from '../../assets/imgs/logo-symbol.png';
import searchIcon from '../../assets/imgs/search-icon-grey-64.png';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const queryText = useRef('');

  const handleSearch = () => {
    navigate(`/items?search=${queryText.current.value}`);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <img 
          src={logo} 
          alt="logo" 
          className="search-img"
          onClick={()=> navigate('/')}
        />
        <input 
          type="text" 
          className="search-input"
          placeholder="Nunca dejes de buscar" 
          ref={queryText}
          onKeyDown={handleKeyDown}
        />
        <button className="btn-search" onClick={handleSearch}>
          <img src={searchIcon} alt="buscar" className="search-icon"/>
        </button>
      </div>
    </div>
  );
};