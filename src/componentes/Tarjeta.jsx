import { useState, useEffect } from 'react';
import { useFecha } from '../utils/UseFecha';

import rain from '../assets/iconos/rain.png';
import snow from '../assets/iconos/snow.png';
import clouds from '../assets/iconos/cloud.png';
import fog from '../assets/iconos/fog.png';
import storm from '../assets/iconos/storm.png';
import sun from '../assets/iconos/sun.png';
import wind from '../assets/iconos/windy.png';

const Tarjeta = ({
    temperature,
    windspeed,
    humidity,
    place,
    heatIndex,
    iconString,
    conditions,
}) => {
    const [image, setImage] = useState(sun);
    const { time } = useFecha();

    useEffect(() => {
        if (iconString) {
            const lowerCaseIcon = iconString.toLowerCase();
            if (lowerCaseIcon.includes('wind')) {
                setImage(wind);
            } else if (lowerCaseIcon.includes('rain') || lowerCaseIcon.includes('drizzle')) {
                setImage(rain);
            } else if (lowerCaseIcon.includes('snow')) {
                setImage(snow);
            } else if (lowerCaseIcon.includes('cloud')) {
                setImage(clouds);
            } else if (lowerCaseIcon.includes('fog')) {
                setImage(fog);
            } else if (lowerCaseIcon.includes('thunder') || lowerCaseIcon.includes('storm')) {
                setImage(storm);
            } else if (lowerCaseIcon.includes('sun')) {
                setImage(sun);
            }
        }
    }, [iconString]);

    return (
        <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
        <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
          <img src={image} alt="weather_icon" />
          <p className='font-bold text-5xl flex justify-center items-center' >{temperature} &deg;C</p>
        </div>
        <div className='font-bold text-center text-xl'>
          {place}
        </div>
        <div className='w-full flex justify-between items-center mt-4'>
          <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
          <p className='flex-1 text-center p-2'>{time}</p>
        </div>
        <div className='w-full flex justify-between items-center mt-4 gap-4'>
          <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{windspeed} km/h</p></p>
          <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
        </div>
        <div className='w-full p-3 mt-4 flex justify-between items-center'>
          <p className='font-semibold text-lg'>Heat Index</p>
          <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
        </div>
        <hr className='bg-slate-600' />
        <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
          {conditions}
        </div>
      </div>
    );
};

export default Tarjeta;
