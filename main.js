'use strict'
//se ejecutara cuando este lista
document.addEventListener("DOMContentLoaded", function () {
   //Declaro variables,pq van a variar segun sitio
  const obtenerUbicacionButton = document.getElementById("obtenerUbicacion");
  //referencia boton ubicacion
  const ubicacionParrafo = document.getElementById("ubicacion");
   //almacena referencia parrafo ubicacion
  const resultadoParrafo = document.getElementById("resultado");
//parrafo resultado
  obtenerUbicacionButton.addEventListener("click", obtenerUbicacion);

  function obtenerUbicacion() {
     //es compatible?
    if ("geolocation" in navigator) {
       //solicita ubicación usuario
      navigator.geolocation.getCurrentPosition(
        
        function (position) {
           //donde esta
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          ubicacionParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
         //muestra resultado
          resultadoParrafo.textContent =
            "Obteniendo ubicación. Realizando solicitud a la API...";

          // Realiza la solicitud a la API
          obtenerPronosticoLluvia(latitude, longitude);
        },
        function (error) {
          //en caso de que falle algo
          ubicacionParrafo.textContent = `Error: ${error.message}`;
        }
      );
    } else {
       //el navegador no es compatible
      ubicacionParrafo.textContent =
        "La geolocalización no está disponible en este navegador.";
    }
  }

  function obtenerPronosticoLluvia(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?forecast=7&latitude=${latitude}&longitude=${longitude}&current=rain&timezone=Europe%2FBerlin`;
 //Metodo fetch. Solicita a la api el pronostico
    fetch(url, {
      method: "GET",//pregunta
    })
      //Si hay respuesta,
      .then((response) => response.json())
      //la almacena en response
      .then((data) => {
        const rain = data.current.rain;
        //si es mayor a cero,
        if (rain > 0) {   
          resultadoParrafo.textContent = "Sí, va a llover.";
        } else {
           //en caso de que no...
          resultadoParrafo.textContent = "No, no va a llover.";
        }
      })
      //esto es por si hay algun error
      .catch((error) => {
        resultadoParrafo.textContent =
          "Error al obtener el pronóstico: " + error.message;
      });
  }
});
