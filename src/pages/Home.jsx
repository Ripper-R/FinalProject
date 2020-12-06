import React from 'react';
import '../App.css';
import Cards from '../components/homecomponent/Cards';
import SectionUtama from '../components/homecomponent/SectionUtama';
import Footer from '../components/homecomponent/Footer';
// import {Route} from 'react-router-dom'
function Home() {
  return (
    <>
      <SectionUtama />
      <Cards />
      <Footer/>
    </>
  );
}

export default Home;
