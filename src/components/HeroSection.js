import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import {Link} from 'react-router-dom'
function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      {/* <img src='images/img-home.jpg'/> */}
      <h1>Your Most Trusted Pharmacy</h1>
      <p>That's not a Joke</p>
      <div className='hero-btns'>
        <Link to='/Register'>
          <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Link With Us Now!
        </Button>
          
          </Link>
        {/* <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
  );
}

export default HeroSection;
