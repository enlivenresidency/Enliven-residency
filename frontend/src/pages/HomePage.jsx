import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import OurProperties from '../components/OurProperties';
import Amenities from '../components/Amenities';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      
      <Carousel />
      <OurProperties />
      <Amenities />
      
    </>
  );
};

export default HomePage;
