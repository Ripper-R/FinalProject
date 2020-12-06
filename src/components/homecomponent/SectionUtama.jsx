import React from 'react';
import '../../App.css';
import { Button } from './Button';
import './SectionUtama.css';
import {Link} from 'react-router-dom'
function SectionUtama() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      {/* <img src='images/img-home.jpg'/> */}
      <h1>Your Most Trusted Pharmacy</h1>
      <p>What Are You Waiting For?</p>
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
      </div>
    </div>
  );
}

export default SectionUtama;
