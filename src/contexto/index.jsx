import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const ClimaContext = createContext();

export const ClimaContextProvider = ({ children }) => {
  const [clima, setClima] = useState({});
  const [valores, setValores] = useState([]);
  const [lugar, setLugar] = useState('Piura');
  const [ubicacion, setUbicacion] = useState('');

  // Fetch API from OpenWeatherMap
  const fetchClima = async () => {
    const apiKey = 'b2dbba5ab20b2646c2627479e6ae517a'; // Replace with your actual API key from OpenWeatherMap

    const options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      params: {
        q: lugar,
        appid: apiKey,
        units: 'metric', // Change units as per your preference (metric or imperial)
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      
      // Process response data from OpenWeatherMap
      setUbicacion(response.data.city.name);
      setValores(response.data.list);
      setClima(response.data.list[0]); // Almacena toda la información del clima

    } catch (error) {
      console.error(error);
      alert('Error al obtener el clima para esta ubicación');
    }
  };

  useEffect(() => {
    fetchClima();
  }, [lugar]);

  return (
    <ClimaContext.Provider
      value={{
        clima,
        setLugar,
        valores,
        ubicacion,
        lugar,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export const useClimaContext = () => useContext(ClimaContext);
