document.getElementById('formulario').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const aeropuerto = document.getElementById('aeropuerto').value;
    const fecha = document.getElementById('fecha').value; // Formato YYYY-MM-DD
    const hora = document.getElementById('hora').value;
    const nombre = document.getElementById('nombre').value;
    const tip = document.getElementById('tip').value;

    // URL de la API REST de SharePoint (ajustar con tu sitio y lista)
    const siteUrl = "https://viarium.sharepoint.com/sites/Centralizados/_api/web/lists/getbytitle('RegistrosFormularios')/items";

    // Cuerpo de la solicitud
    const body = {
        "__metadata": { "type": "SP.Data.RegistrosFormulariosListItem" }, // Cambia según el nombre interno de tu lista
        "Aeropuerto": aeropuerto,
        "Fecha": fecha,
        "Hora": hora,
        "NombreVigilante": nombre,
        "TIP": tip
    };

    try {
        // Obtener el token X-RequestDigest
        const digestResponse = await fetch("https://viarium.sharepoint.com/sites/Centralizados/_api/contextinfo", {
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose"
            },
            credentials: "include"
        });

        if (!digestResponse.ok) {
            throw new Error("Error al obtener el token X-RequestDigest");
        }

        const digestData = await digestResponse.json();
        const requestDigest = digestData.d.GetContextWebInformation.FormDigestValue;

        // Enviar datos a la lista de SharePoint
        const response = await fetch(siteUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": requestDigest
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        if (response.ok) {
            alert("Datos guardados correctamente en SharePoint.");
        } else {
            const errorText = await response.text();
            console.error("Error al guardar los datos:", errorText);
            alert("Error al guardar los datos. Verifique la consola.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error al conectar con SharePoint.");
    }
});
