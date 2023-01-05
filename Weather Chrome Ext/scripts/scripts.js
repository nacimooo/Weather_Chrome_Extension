const weatherKey = 'YourWheatherAPIKeyGoesHere';
const locationKey = 'YourIpAPIKeyGoesHere';


/**
 * Fucntion that takes the an iP address and returns 
 * 
*/
function getLocation(ip) {

    fetch(`http://api.ipstack.com/${ip}?access_key=${locationKey}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('city').innerHTML += data.city + "<br>";
            getTemp(data.latitude, data.longitude);

            return [data.longitude, data.latitude];
        })
        .catch(err => console.log(err));
}

/**
 * Takes a city and a country code.
 * gets the longitude and latitude and passes them to getTemp
 * 
*/
async function getInfo(city, country) {

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${weatherKey}`

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            getTemp(data[0].lat, data[0].lon)
        })

}


/**
 * Takes a Latitude and Longitude and changes the value of the 'call' object
 * to the temp in that areas
 * 
*/
function getTemp(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`;

    let answer;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('temp').innerHTML += "Current: " + data.main.temp + "C <br>";
            document.getElementById('feels').innerHTML += "Feels Like: " + data.main.feels_like + "C <br>";
            document.getElementById('weather').innerHTML += "Weather: " + data.weather[0].main;
            

        })
        .catch(error => {
            console.error(error);
        });
}



/**
 * Function that retrieves the current ip address of the user.
 * @returns : the Ip address of the user
 */
function getIpAddress() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET", "https://api.ipify.org?format=json", false);
    xmlhttp.send();

    var ip = JSON.parse(xmlhttp.responseText).ip;

    console.log(ip);
    return ip;
}


getLocation(getIpAddress())