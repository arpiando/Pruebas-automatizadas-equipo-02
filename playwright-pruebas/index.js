import fetch from "node-fetch";

export async function fetchMockarooData() {
  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", "81e02ef0");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://my.api.mockaroo.com/members?key=81e02ef0&seed=12345&count=10",
      requestOptions
    );

    if (!response.ok) {
      // Manejo de errores HTTP
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data); // Datos obtenidos
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
