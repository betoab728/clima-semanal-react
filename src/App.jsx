import { useState } from 'react';
import './App.css';
import search from './assets/iconos/search.svg';
import { Fondo, Tarjeta, MiniTarjeta } from './componentes';
import { useClimaContext } from './contexto';

function App() {
  const [input, setInput] = useState('');
  const { clima, ubicacion, valores, lugar, setLugar } = useClimaContext();

  const submitCity = () => {
    setLugar(input);
    setInput('');
  };

  // Filtrar y agrupar datos por día
  const agruparPorDia = (datos) => {
    const agrupado = {};
    datos.forEach((dato) => {
      const fecha = new Date(dato.dt_txt).toLocaleDateString('en-GB');
      if (!agrupado[fecha]) {
        agrupado[fecha] = [];
      }
      agrupado[fecha].push(dato);
    });
    return agrupado;
  };

  // Filtrar y ordenar datos para mostrar en MiniTarjetas
  const datosPorDia = agruparPorDia(valores);

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-2 flex flex-col items-center">
        <div className="w-full flex justify-center">
          <h1 className="font-bold  text-orange-600 text-center text-3xl">Pronóstico del clima</h1>
        </div>
        <div className="w-full flex justify-center mt-2">
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder="Ciudad.."
            className="focus:outline-none text-[#212121] rounded w-[13rem] p-2 text-sm mr-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={submitCity} 
            className="bg-blue-600 text-white rounded text-sm px-1"
          >
            Buscar
          </button>
        </div>
      </nav>
      
      <Fondo></Fondo>
      <main className="w-full flex flex-wrap gap-4 py-2 px-[5%] items-center justify-center">
        <Tarjeta
          place={ubicacion}
          windspeed={clima && clima.wind ? clima.wind.speed : null}
          temperature={clima && clima.main ? clima.main.temp : null}
          humidity={clima && clima.main ? clima.main.humidity : null}
          heatIndex={clima && clima.main ? clima.main.feels_like : null}
          iconString={clima && clima.weather ? clima.weather[0].icon : null}
          conditions={clima && clima.weather ? clima.weather[0].main : null}
        />

        <div className="flex justify-center gap-5 flex-wrap w-full lg:w-[50%]">
          {Object.keys(datosPorDia).map((fecha) => (
            <MiniTarjeta
              key={fecha} // Utiliza la fecha como clave única
              time={datosPorDia[fecha][0].dt_txt} // Toma la primera hora del día para representar el día completo
              tempe={datosPorDia[fecha][0].main.temp} // Toma la temperatura del primer período del día
              iconString={datosPorDia[fecha][0].weather[0].main} // Toma el icono del clima del primer período del día
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
