import { useState, useEffect } from 'react';
import clear from '../assets/Clear.jpg';
import rain from '../assets/Rainy.jpg';
import snow from '../assets/snow.jpg';
import clouds from '../assets/Cloudy.jpg';
import fog from '../assets/fog.png';
import storm from '../assets/Stormy.jpg';
import sun from '../assets/Sunny.jpg';

const MiniTarjeta = ({ time, tempe, iconString }) => {
  const [icon, setIcon] = useState('');
  const [weekday, setWeekday] = useState('');

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('clear')) {
        setIcon(clear);
      } else if (iconString.toLowerCase().includes('rain') || iconString.toLowerCase().includes('drizzle')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('cloud')) {
        setIcon(clouds);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('thunder') || iconString.toLowerCase().includes('storm')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('sun')) {
        setIcon(sun);
      }
    }
  }, [iconString]);

  useEffect(() => {
    if (time) {
      const date = new Date(time); // Crea un objeto Date desde la fecha y hora UTC
      setWeekday(date.toLocaleString('en', { weekday: 'long' })); // Obtiene el nombre del día de la semana local
    }
  }, [time]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">{weekday}</p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img src={icon} alt="Icono del clima" className="w-[4rem] h-[4rem]" />
      </div>
      <p className="text-center font-bold">{tempe}&deg;</p>
    </div>
  );
};

export default MiniTarjeta;
