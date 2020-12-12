import React from 'react';
import '../App.css';
import Cards from '../components/homecomponent/Cards';
import Herosection from '../components/homecomponent/Herosection';
import Footer from '../components/homecomponent/Footer';
// import {Route} from 'react-router-dom'
function Home() {
  return (
    <>
      <Herosection />
      <Cards />
      <Footer/>
    </>
  );
}

export default Home;
