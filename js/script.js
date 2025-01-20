document.getElementById('formulario').addEventListener('submit', async function (e) {
    e.preventDefault();

    // valores
    const aeropuerto = document.getElementById('aeropuerto').value;
    const fecha = document.getElementById('fecha').value; // Formato YYYY-MM-DD
    const hora = document.getElementById('hora').value;
    const nombre = document.getElementById('nombre').value;
    const tip = document.getElementById('tip').value;

    //URL del flujo en Power Automate(esta en el flujo)
    const url = "https://prod-122.westeurope.logic.azure.com:443/workflows/07269c2c08524a3c8cc9ae1576a3dfa5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QJnp8DpPD1xhix44vE1gCy8VJF27w_mdsn4u0nD2HZ8"; // url automate

    // cuerpo de solicitud
    const body = {
        aeropuerto: aeropuerto,
        fecha: fecha,
        hora: hora,
        nombre: nombre,
        tip: tip
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            alert("Datos enviados correctamente a Power Automate.");
        } else {
            const errorResponse = await response.text();
            console.error("Error al enviar los datos:", errorResponse);
            alert("Error al enviar los datos. Verifique la consola.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error de conexión al intentar enviar los datos.");
    }
});
