import React from 'react';
import '../App.css';
import Cards from '../components/homecomponent/Cards';
import HeroSection from '../components/homecomponent/HeroSection';
import Footer from '../components/homecomponent/Footer';
import {Route} from 'react-router-dom'
function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer/>
    </>
  );
}

export default Home;
