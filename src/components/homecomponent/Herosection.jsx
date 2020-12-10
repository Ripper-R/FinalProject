import React from 'react';
import '../../App.css';
import { Button } from './Button';
import './Herosection.css';
import {Link} from 'react-router-dom'
function Herosection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      {/* <img src='images/img-home.jpg'/> */}
      <h1 style={{textAlign:'center'}}>Your Most Trusted Pharmacy</h1>
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

export default Herosection;
