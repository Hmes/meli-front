import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import './StandardLayout.scss';
import logo from '../assets/imgs/logo.png';

const Home = () => {
  return <div className="home-container">
    <img src={logo} alt="logo" className="home-logo"/>
  </div>
}

const StandardLayout = ({MainContent}) => {
  return (
    <div className="standardlayout">
      <header><SearchBar/></header>
      <main>{MainContent || <Home />}</main>
    </div>
  );
};

export default StandardLayout;