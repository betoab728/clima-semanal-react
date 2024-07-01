import { useClimaContext } from '../contexto';
import { useState, useEffect } from 'react';
import clear from '../assets/imagenes/Clear.jpg';
import rain from '../assets/imagenes/Rainy.jpg';
import snow from '../assets/imagenes/snow.jpg';
import clouds from '../assets/imagenes/Cloudy.jpg';
import fog from '../assets/imagenes/fog.png';
import storm from '../assets/imagenes/Stormy.jpg';
import sun from '../assets/imagenes/Sunny.jpg';

const Fondo = () => {
  const { clima } = useClimaContext();
  const [image, setImage] = useState(clear);

  useEffect(() => {
    if (clima.conditions) {
      let imageString = clima.conditions;
      if (imageString.toLowerCase().includes('clear')) {
        setImage(clear);
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
        setImage(rain);
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(snow);
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(clouds);
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(fog);
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(storm);
      } else if (imageString.toLowerCase().includes('sun')) {
        setImage(sun);
      }
    }
  }, [clima]);

  return (
    <img src={image} alt="imagen del clima" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  );
};

export default Fondo;
