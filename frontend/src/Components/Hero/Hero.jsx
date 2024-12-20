import React from 'react'
import './Hero.css'
import arrow_icon from '../Assests/arrow.png'
import hero_image from '../Assests/hero_image.png'
const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
          <h2> NEW ARRIVALS ONLY</h2>
        <div>
        <div className="hAND-hand-icon">
            <p>new</p>
            </div>
    <p>collections</p>
    <p>for everyone</p>
</div>
<div className="hero-latest-btn">
    <div>Latest Collection</div>
    <img src={arrow_icon} alt="" />
    </div>
</div>
<div className="hero-right" >
    <img src={hero_image } alt="" />
</div>
</div>

  )
}

export default Hero
