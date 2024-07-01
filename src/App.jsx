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
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl text-orange-600">Pronóstico del clima</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img className="w-[1.5rem] h-[1.5rem] " src={search} alt="search" />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder="Ciudad.."
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
         <button onClick={submitCity} className="bg-blue-600 text-[#ffff] px-4 py-2 rounded-lg">Buscar </button>
        </div>
       
      </nav>
      <Fondo></Fondo>
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <Tarjeta
          place={ubicacion}
          windspeed={clima && clima.wind ? clima.wind.speed : null}
          temperature={clima && clima.main ? clima.main.temp : null}
          humidity={clima && clima.main ? clima.main.humidity : null}
          heatIndex={clima && clima.main ? clima.main.feels_like : null}
          iconString={clima && clima.weather ? clima.weather[0].icon : null}
          conditions={clima && clima.weather ? clima.weather[0].main : null}
        />

        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
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
