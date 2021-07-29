
// let lat, lon; 
//let aqKeys, aqValues = [];
// let aq_datata;
//let weatherData = [];

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition( async (position)=> {
        try{
            let lat = position.coords.latitude.toFixed(2);
            let lon = position.coords.longitude.toFixed(2);
            const api_url = `/weather/${lat},${lon}`;

            const response = await fetch(api_url); //BROKEN
            const json = await response.json();
            const { weather, aq } = json;

            let weatherData = [];
            weatherData[0] = weather.weather[0].description;
            weatherData[1] = Math.floor((weather.main.temp - 273)*9/5 + 32);

            const weatherPara = document.getElementById("weather-para");
            weatherPara.textContent = `The weather now is ${weatherData[0]} and ${weatherData[1]}°F`;

            //air quality data
            let aq_datata = aq.list[0].components; console.log("line 25: ",aq_datata);
            //aq_datata = aq.list[0].components; console.log("line 26: ",aq_datata);

            let aqValues = Object.values(aq_datata); console.log("line 28: ",aqValues);
            let aqKeys = Object.keys(aq_datata); console.log("line 29: ",aqKeys);

            const table = document.createElement('table');
            const tr = document.createElement('tr');
            const thk = document.createElement('th');
            thk.textContent = "Compound";
            tr.appendChild(thk);
            const thv = document.createElement('th');
            thv.textContent = "Value";
            tr.appendChild(thv);
            table.appendChild(tr);

            // console.log(aq);
            for(i=0; i<aqValues.length; i++){
                const tr = document.createElement('tr');
                const tdk = document.createElement('td');
                tdk.textContent = `${aqKeys[i]}:`;
                tr.appendChild(tdk);
                const tdv = document.createElement('td');
                tdv.textContent = `${aqValues[i]}μg/m^3`;
                tr.appendChild(tdv);
                table.appendChild(tr);
            }
            const aqPara = document.getElementById("aq-para");
            aqPara.appendChild(table);


            const data = {lat, lon, weatherData, aqKeys, aqValues};
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data),
            };
            const db_response = await fetch("/api", options);
            const db_json = await db_response.json();
            console.log("db_json: ", db_json);

        }catch(err){
            console.log("Something went wrong: ")
            console.error(err);
            data.aqValues = {value: -1};
        }
    });
}else{
    console.log("geolocation not supported");
}

