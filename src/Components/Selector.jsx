import React, {useState} from 'react';
import apiCall from '../api';

function Selector({citiToShow, currentPosition, setData, setCitiToShow, setShowLoading}) {
    const CITIES = [
        {
          name: "Tu ubicación",
          id: "ubicacion",
          lat: currentPosition?.lat,
          lon: currentPosition?.lon,
        },
        { name: "Barcelona", id: "bcn", lat: 41.38879, lon: 2.15899 },
        { name: "Necochea", id: "neco", lat: -38.560386, lon: -58.8263165 },
        { name: "Mar del Plata", id: "mdq", lat: -38.0172131, lon: -57.74062 },
        { name: "Buenos Aires", id: "caba", lat: -34.6154611, lon: -58.5733849 },
        { name: "Córdoba", id: "cba", lat: -31.399084, lon: -64.334431 },
      ];

      const handleCityChange = async (citiId) => {
        const citi = CITIES.find((citi) => citi.id === citiId);
        setCitiToShow(citi.name);
        setShowLoading(true);
    
        const dataApi = await apiCall.fetch(citi);
    
        setData(dataApi);
        setShowLoading(false);
      };

    return (
        <select onChange={(e) => handleCityChange(e.target.value)}>
            <option value="">{citiToShow}</option>
            {CITIES.filter((citi) => citi.name !== citiToShow)
              .sort((citiPrev, citiNext) =>
                citiPrev.name.localeCompare(citiNext.name)
              )
              .map((citi) => (
                <option key={citi.id} value={citi.id}>
                  {citi.name}{" "}
                </option>
              ))}
          </select>
    )
}

export default Selector
