document.addEventListener("DOMContentLoaded", function () {
  const obtenerUbicacionButton = document.getElementById("obtenerUbicacion");
  const ubicacionParrafo = document.getElementById("ubicacion");
  const resultadoParrafo = document.getElementById("resultado");

  obtenerUbicacionButton.addEventListener("click", obtenerUbicacion);

  function obtenerUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          ubicacionParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
          resultadoParrafo.textContent =
            "Obteniendo ubicación. Realizando solicitud a la API...";

          // Realiza la solicitud a la API
          obtenerPronosticoLluvia(latitude, longitude);
        },
        function (error) {
          ubicacionParrafo.textContent = `Error: ${error.message}`;
        }
      );
    } else {
      ubicacionParrafo.textContent =
        "La geolocalización no está disponible en este navegador.";
    }
  }

  function obtenerPronosticoLluvia(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?forecast=7&latitude=${latitude}&longitude=${longitude}&current=rain`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const rain = data.current.rain;
        if (rain > 0) {
          resultadoParrafo.textContent = "Sí, va a llover.";
        } else {
          resultadoParrafo.textContent = "No, no va a llover.";
        }
      })
      .catch((error) => {
        resultadoParrafo.textContent =
          "Error al obtener el pronóstico: " + error.message;
      });
  }
});
