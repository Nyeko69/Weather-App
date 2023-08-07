const API_KEY = 'aad5943e214f050325618afcd9403d15';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const convertBtn = document.querySelector(".convert");


//Trigger the checkWeather function
//Search button is clicked
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
//OR "Enter" is pressed in the search box
searchBox.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        checkWeather(searchBox.value);
    }
});


async function checkWeather(city_name){//API call to get weather info
    const response = await fetch(API_URL + city_name);

    if(response.status == 404){//Invalid input
        //show error message & hide weather info and convert button
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".convert").style.display = "none";
        document.body.style.backgroundImage = "linear-gradient(135deg, #2e2e2e, #2e2e2e, #2e2e2e)";
    }
    else{//Valid input
        var data = await response.json();
        //console.log(data); //full weather info

        //change hmtl elements to weather info
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".min").innerHTML = "Min: " + Math.round(data.main.temp_min) + "°C";
        document.querySelector(".max").innerHTML = "Max: " + Math.round(data.main.temp_max) + "°C";

        //update weather icon & background
        if(data.weather[0].main == "Clouds"){
            if(data.weather[0].id == 801){
                background = "linear-gradient(135deg, #ffe13a, rgb(190, 190, 190), #646464)"
                changeIcon("images/partlycloudy.png", "Partly Cloudy", background);
            }
            else{
                background = "linear-gradient(135deg, #ececec, rgb(116, 116, 116), #161616)";
                changeIcon("images/cloudy.png", "Cloudy", background);
            }
        }
        else if(data.weather[0].main == "Clear"){
            background = "linear-gradient(135deg, #ff1919d2, rgb(255, 129, 26), #fffb22d3)";
            changeIcon("images/sunny.png", "Sunny", background);
        }
        else if(data.weather[0].main == "Drizzle"){
            background = "linear-gradient(135deg, #494949, rgb(148, 148, 148), #003c6d)";
            changeIcon("images/raining.png", "Drizzle", background);
        }
        else if(data.weather[0].main == "Rain"){
            background = "linear-gradient(135deg, #2c3038, rgb(60, 97, 131), #020d74)";
            changeIcon("images/raining.png", "Rain", background);
        }
        else if(data.weather[0].main == "Mist"){
            background = "linear-gradient(135deg, #fff2a9, #c0c0c0, #fffeb2)";
            changeIcon("images/mist.png", "Mist", background);
        }
        else if(data.weather[0].main == "Thunderstorm"){
            background = "linear-gradient(135deg, #1f1f1f, rgb(255, 253, 112), #000531)";
            changeIcon("images/thunder.png", "Thunder Storm", background);
        }
        else if(data.weather[0].main == "Snow"){
            background = "linear-gradient(135deg, #ffffff, rgb(148, 148, 148), #c0c0c0)";
            changeIcon("images/snow.png", "Snow", background);
        }

        //show weather info and hide error message & convert button
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".convert").style.display = "block";
    }
}


function changeIcon(img, title, background){//function to change weather icon and background
    weatherIcon.src = img;
    weatherIcon.title = title;
    document.body.style.backgroundImage = background;
    document.body.style.backgroundSize = "250%";
    document.body.style.animation = "bg-animation 10s linear infinite";
}



//Convert button is clicked
convertBtn.addEventListener("click", ()=>{
    convert();
});

function convert(){//function to convert temperatures between Celcius and Fahrenheit
    var currTemp = document.querySelector(".temp").innerHTML;
    var min = document.querySelector(".min").innerHTML;
    var max = document.querySelector(".max").innerHTML;
    var Currspeed = document.querySelector(".wind").innerHTML;
    
    //convert string to int
    var temp = parseInt(currTemp.slice(0, -2));
    min = parseInt(min.slice(5, -2));
    max = parseInt(max.slice(5, -2));

    if(Currspeed.charAt(Currspeed.length - 2) == "/"){//convert to miles
        var speed = parseFloat(Currspeed.slice(0, -5));
    }
    else if(Currspeed.charAt(Currspeed.length - 2) == "p"){//convert to km
       var speed = parseFloat(Currspeed.slice(0, -4));
    }

    if(currTemp.charAt(currTemp.length - 1) == "C"){//change html elements to American system
        document.querySelector(".temp").innerHTML = CelFah(temp) + "°F";
        document.querySelector(".min").innerHTML = "Min: " + CelFah(min) + "°F";
        document.querySelector(".max").innerHTML = "Max: " + CelFah(max) + "°F";
        document.querySelector(".wind").innerHTML = (speed/1.609).toFixed(2) + " mph";
    }
    else{//change html elements to metric system
        document.querySelector(".temp").innerHTML = FahCel(temp) + "°C";
        document.querySelector(".min").innerHTML = "Min: " + FahCel(min) + "°C";
        document.querySelector(".max").innerHTML = "Max: " + FahCel(max) + "°C";
        document.querySelector(".wind").innerHTML = (speed*1.609).toFixed(2) + " km/h";
    }
}

function CelFah(temp){//Convert Celcius to Fahrenheit
    return Math.round( (temp* (9.0/5)) + 32 )
}
function FahCel(temp){//Convert Fahrenheit to Celcius
    return Math.round( (temp - 32)* (5/9.0) )
}