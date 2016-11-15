var images = {
    //GENERIC PHOTOS
    default: "http://mollyirwin.typepad.com/.a/6a00d8349eed6669e20133f413a22f970b-pi",
    clear: "https://snapshotsofwanaka.files.wordpress.com/2013/06/20130606-161727.jpg",
    thunderstorm: "http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg",
    drizzle: "http://cdn.pcwallart.com/images/rain-cloud-wallpaper-3.jpg",
    rain: "https://i3.wallpaperscraft.com/image/rain_island_clouds_volume_sky_52002_1920x1080.jpg",
    snow: "http://www.hdwallpapersact.com/wp-content/uploads/2013/12/snow-falling-in-a-city-wallpapr.jpg",
    few: "http://mollyirwin.typepad.com/.a/6a00d8349eed6669e20133f413a22f970b-pi",
    scatteredbroken: "https://coclouds.com/wp-content/uploads/2011/06/illuminated-scattered-clouds-2011-06-21.jpg",
    overcast: "https://coclouds.com/wp-content/uploads/2011/11/morning-clouds-backlit-spotted-overcast-panoramic-2011-11-28.jpg",
    mistfoghaze: "https://pompeypop.files.wordpress.com/2010/12/misty-common.jpg",
    //CHICAGO PHOTOS
    chicago: {
        clear: "http://cleartheairchicago.com/files/2014/09/2009-09-18_3060x2040_chicago_skyline.jpg",
        thunderstorm: "https://s-media-cache-ak0.pinimg.com/originals/ba/f2/50/baf250148733333187b1d0c2a902f5ab.jpg",
        clouds: "https://c2.staticflickr.com/6/5254/5436125688_966b27402a_b.jpg",
        //CHICAGO NIGHT PHOTOS
        night: {
            clear: "http://www.richard-seaman.com/Wallpaper/USA/Cities/Chicago/ChicagoAtNightWide.jpg",
            clouds: "https://s-media-cache-ak0.pinimg.com/originals/2d/f8/26/2df82632870272e3f7858da0977511c5.jpg"
        }
    },
    //GENERIC NIGHT PHOTOS
    night: {
        clear: "http://i.imgur.com/HF3Xxg1.jpg",
        clouds: "http://pre03.deviantart.net/cd6a/th/pre/i/2008/239/6/5/cloudy_night_sky_by_ramosburrito.jpg"
    }
};
var newimage = "";

function getWeather() {
    //GET FIELD VALUE
    var zipcode = document.getElementById("zipcode").value;
    if (zipcode == "") {
        zipcode = "61820";
        document.getElementById("zipcode").value = zipcode;
    }
    //GENERATE URL AND SEND JSON REQ
    var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",US&appid=fc4193a032f2244550b8fb77a65f9c3d";
    jsonRequest(url);
}

function processResponse(wxObject, rawResponse) {
    var icon = "";
    var isnight = false;
    var currenttime = Date.now() / 1000;

    //SETS ICON AND ISNIGHT CONDITION BASED ON TIME OF DAY
    if (currenttime > wxObject.sys.sunrise && currenttime < wxObject.sys.sunset) {
        icon = "fa-sun-o";
        isnight = false;
    } else {
        icon = "fa-moon-o";
        isnight = true;
    }

    //CONVERTS TEMP FROM KELVIN TO F
    var tempinf = Math.round(wxObject.main.temp * (9 / 5) - 459.67);
    var city = wxObject.name;

    //DISPLAYS THE CITY, TEMP, AND ICON
    document.getElementById("report").innerHTML = "<i id='report' class='fa " + icon + " fa-lg'><span id='reporttext'> " + city + " &ndash; " + tempinf + "&deg;</span></i>";

    //INITIALIZE A STRING TO DESCRIBE THE CONDITIONS
    var conddescrip = "";

    //LOOP THROUGH THE WEATHER ARRAY ELEMENTS IN API RESPONSE TO COMBINE THE DIFFERENT CONDITIONS INTO ONE STRING
    for (var i = 0; i < wxObject.weather.length; i++) {
        if (i == wxObject.weather.length - 1 && i > 0) {
            conddescrip += "&#32; &amp; &#32;" + wxObject.weather[i].description;
        } else if (i < wxObject.weather.length && i > 0) {
            conddescrip += ", &#32;" + wxObject.weather[i].description;
        } else {
            conddescrip = wxObject.weather[i].description;
        }
    }

    //DISPLAY THE WEATHER CONDITIONS FROM THE LOOP
    document.getElementById("wxconditions").innerHTML = "<p id='wxconditions'>" + conddescrip.toUpperCase() + "</p>";
    

    //CONDITIONS IS THE WEATHER CONDITION ID FROM THE API RESPONSE AND LISTED IN THE API DOC
    var conditions = wxObject.weather[0].id;
    
    //PRIORITIZE THUNDERSTORM IMAGE BY LOOPING THROUGH THE WEATHER ARRAY AND SEEING IF ANY OF THE ELEMENTS DESCRIBES A THUNDERSTORM
    //IF SO, SET SAID ELEMENT AS CONDITIONS
    
    for (var i = 0; i < wxObject.weather.length; i++) {
        var wxid = wxObject.weather[i].id;
        if (/2\d\d/g.test(wxid) == true) {
            conditions = wxid;
        }
    }

    //CHANGE THE BACKGROUND IMAGE
    //TEST TO SEE IF THE LOCATION IS A SPECIFIC CITY FOR THE 30 PT EC ASSIGNMENT
    if (wxObject.name == "Chicago") {
        if (conditions == "800") {
            newimage = images.chicago.clear;
            if (isnight == true) {
                newimage = images.chicago.night.clear;
            }
        } else if (/8\d\d/g.test(conditions) == true) {
            newimage = images.chicago.clouds;
            if (isnight == true) {
                newimage = images.chicago.night.clouds;
            }
        } else {
            newimage = "";
        }
    } else if (/2\d\d/g.test(conditions) == true) {
        newimage = images.thunderstorm;
    } else if (/3\d\d/g.test(conditions) == true) {
        newimage = images.drizzle;
    } else if (/5\d\d/g.test(conditions) == true) {
        newimage = images.rain;
    } else if (/6\d\d/g.test(conditions) == true) {
        newimage = images.snow;
    } else if (conditions == "800") {
        if (isnight == true) {
            newimage = images.night.clear;
        } else {
            newimage = images.clear;
        }
    } else if (conditions == "801") {
        newimage = images.few;
    } else if (conditions == "802" || conditions == "803") {
        newimage = images.scatteredbroken;
    } else if (conditions == "804") {
        newimage = images.overcast;
    } else if (conditions == "701" || conditions == "721" || conditions == "741") {
        newimage = images.mistfoghaze;
    } else {
        newimage = "";
    }

    //APPLY NEW IMAGE TO THE BACKGROUND OF THE PAGE
    document.body.style.background = "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('" + newimage + "')";
    //SET CSS SO BACKGROUND COVERS THE PAGE
    document.body.style.backgroundSize = "cover";
    //SET THE BACKGROUND POSITION
    document.body.style.backgroundPosition = "center center";
    //IF THE BACKGROUND IS ONE THAT LOOKS BETTER IN THE CENTER BOTTOM POSITION, SET THAT
    if (newimage == images.clear) {
        document.body.style.backgroundPosition = "center bottom";
    }
    //alert(conditions);
}

function processError() {
    alert("There was an error while retrieving your weather. This could be due to too many requests or an improper ZIP code.");
    //BLANK OUT THE BACKGROUND IMAGE (LOOK AT THE ASSIGNMENT WE MIGHT NEED TO CHANGE THE IMAGE TO AN ERROR IMAGE BASED ON THE RUBRIC)
    newimage = "";
    document.body.style.background = "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('" + newimage + "')";
    document.body.style.backgroundSize = "cover";
    //REMOVE THE CONDITION DESCRIPTION
    document.getElementById("report").innerHTML = "";
    document.getElementById("wxconditions").innerHTML = "";
}


function showHint() {
    //SHOWS TIP TO USER IF QUESTION MARK IS CLICKED
    alert("Important information to receive the 30 points extra credit: \n\nEnter one of the following cities/ZIP codes to see unique images for certain cities:\n\nChicago (e.g. 60609), Los Angeles (e.g. 90xxx)\n");
}

//DO NOT EDIT BELOW

function jsonRequest(url) {
    var con = new XMLHttpRequest();
    con.onreadystatechange = function () {
        if (con.readyState === XMLHttpRequest.DONE) {
            // A connection's state can change multiple times, so we need to check whether 
            // it is now done and whether the response was a good one (status 200 means everyhting is great)
            if (con.status === 200) {
                // If we have a good response, we take the JSON string and convert it to an object.
                // We then call the processResponse function to analye the received data
                processResponse(JSON.parse(con.responseText), con.responseText);
            } else {

                processError();
            }
        }
    };
    // This opens the connection to the server and sends the actual request:
    con.open("GET", url, true);
    con.send();
}
