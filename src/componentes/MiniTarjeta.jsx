import { useState, useEffect } from 'react';
import wind from '../assets/iconos/windy.png';
import rain from '../assets/iconos/rain.png';
import snow from '../assets/iconos/snow.png';
import clouds from '../assets/iconos/cloud.png';
import fog from '../assets/iconos/fog.png';
import storm from '../assets/iconos/storm.png';
import sun from '../assets/iconos/sun.png';


const MiniTarjeta = ({ time, tempe, iconString }) => {
  const [icon, setIcon] = useState('');
  const [weekday, setWeekday] = useState('');

  //para traducir el dia de la semana

  const translateDayOfWeek = (dayOfWeek) => {
    switch (dayOfWeek.toLowerCase()) {
      case 'monday':
        return 'Lunes';
      case 'tuesday':
        return 'Martes';
      case 'wednesday':
        return 'Miércoles';
      case 'thursday':
        return 'Jueves';
      case 'friday':
        return 'Viernes';
      case 'saturday':
        return 'Sábado';
      case 'sunday':
        return 'Domingo';
      default:
        return dayOfWeek; // Si el día no coincide con ninguno de los anteriores, devuelve el original
    }
  };

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
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
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
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
    <div className="glassCard w-[8rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">{ translateDayOfWeek(weekday)}</p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img src={icon} alt="Icono del clima" className="w-[4rem] h-[4rem]" />
      </div>
      <p className="text-center font-bold">{tempe}&deg;</p>
    </div>
  );
};

export default MiniTarjeta;
