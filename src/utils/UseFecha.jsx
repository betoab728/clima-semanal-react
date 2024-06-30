import { useEffect, useState } from "react";


export const useFecha = () => {
   
    const locale="en";

    const [date, setDate] = useState(new Date());

   useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    },60* 1000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  const dia = date.toLocaleDateString(locale, { weekday: 'long' });
  
  const fecha= ` ${dia}, ${date.getDate()}, ${date.toLocaleDateString(locale, { month: 'long' })}\n \n`

  const hora =date.toLocaleDateString(locale, {hour: 'numeric',hour12: true, minute: 'numeric'})
  

  return {fecha,hora}

}