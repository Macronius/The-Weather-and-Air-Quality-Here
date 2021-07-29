const mymap = L.map("checkinMap").setView([0, 0], 1); //zoom level: 1, lat/lon: 0,0
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution: attribution});
tiles.addTo(mymap);


getData();

async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    for(item of data) {
        // console.log(item);
        const marker = L.marker([item.lat, item.lon]).addTo(mymap);

        let popupText = `The weather at ${item.lat}&deg;,${item.lon}&deg; is ${item.weatherData[0]} at ${item.weatherData[1]}&deg;F.`;

        if(item.aqValues.value < 0) {
            popupText += `  No air quality data available`;
        }else{
            popupText += `  The air quality report is: 
            ${item.aqKeys[0]}: ${item.aqValues[0]}μg/m^3
            ${item.aqKeys[1]}: ${item.aqValues[1]}μg/m^3
            ${item.aqKeys[2]}: ${item.aqValues[2]}μg/m^3
            ${item.aqKeys[3]}: ${item.aqValues[3]}μg/m^3
            ${item.aqKeys[4]}: ${item.aqValues[4]}μg/m^3
            ${item.aqKeys[5]}: ${item.aqValues[5]}μg/m^3
            ${item.aqKeys[6]}: ${item.aqValues[6]}μg/m^3
            ${item.aqKeys[7]}: ${item.aqValues[7]}μg/m^3`;
        }
        marker.bindPopup(popupText);
    }
    console.log(data);
}