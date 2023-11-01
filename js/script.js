document.addEventListener("DOMContentLoaded", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Llama a obtenerLocalidad dentro de la función de geolocalización
            obtenerLocalidad(lat, lon);
        });
    } else {
        console.log("La geolocalización no está disponible en este navegador.");
    }
});

function obtenerLocalidad(latitud, longitud) {
    // URL de la API de tu servidor proxy (reemplaza con la URL de tu servidor)
    const proxyUrl = 'http://tu-servidor-proxy.com/tu-ruta-proxy';

    fetch(proxyUrl + `?latitude=${latitud}&longitude=${longitud}&daily=temperature_2m_max&daily=temperature_2m_min&current_weather=true&timezone=auto&lang=es&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Procesa los datos aquí
            const temperaturaMaxima = data.daily.temperature_2m_max[0];
            const temperaturaMinima = data.daily.temperature_2m_min[0];
            const temperaturaActual = data.current_weather;
            
            // Obtiene la localidad desde los datos de la API
            const localidad = data.location.name;
            console.log("Localidad: " + localidad);

            document.getElementById("temperatura-max").textContent = temperaturaMaxima + '°C';
            document.getElementById("temperatura-min").textContent = temperaturaMinima + '°C';
            document.getElementById("temperatura-actual").textContent = temperaturaActual;

            // Actualiza el elemento con id "localidad" con la localidad obtenida
            document.getElementById("localidad").textContent = localidad;
        })
        .catch(error => {
            console.error("Error al obtener los datos meteorológicos:", error);
        });
}

