var images = {
    //GENERIC PHOTOS
    default: "http://mollyirwin.typepad.com/.a/6a00d8349eed6669e20133f413a22f970b-pi",
    clear: "http://susanstilwell.com/wp-content/uploads/2011/10/dreamstimefree_20823097.jpg",
    thunderstorm: "http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg",
    drizzle: "http://cdn.pcwallart.com/images/rain-cloud-wallpaper-3.jpg",
    rain: "https://i3.wallpaperscraft.com/image/rain_island_clouds_volume_sky_52002_1920x1080.jpg",
    snow: "http://www.hdwallpapersact.com/wp-content/uploads/2013/12/snow-falling-in-a-city-wallpapr.jpg",
    few: "http://mollyirwin.typepad.com/.a/6a00d8349eed6669e20133f413a22f970b-pi",
    scatteredbroken: "https://coclouds.com/wp-content/uploads/2011/06/illuminated-scattered-clouds-2011-06-21.jpg",
    overcast: "https://coclouds.com/wp-content/uploads/2011/11/morning-clouds-backlit-spotted-overcast-panoramic-2011-11-28.jpg",
    //CHICAGO PHOTOS
    chicago: {
        clear: "http://cleartheairchicago.com/files/2014/09/2009-09-18_3060x2040_chicago_skyline.jpg",
        thunderstorm: "https://s-media-cache-ak0.pinimg.com/originals/ba/f2/50/baf250148733333187b1d0c2a902f5ab.jpg",
        few: "https://c2.staticflickr.com/6/5254/5436125688_966b27402a_b.jpg",
    }
};

function getWeather(){
    //GET FIELD VALUE
    var zipcode = document.getElementById("zipcode").value;
    //GENERATE URL AND SEND JSON REQ
  	var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",US&appid=fc4193a032f2244550b8fb77a65f9c3d";
	jsonRequest(url);
}

function processResponse(wxObject,rawResponse){
    var newimage;
    var conditions = wxObject.weather[0].id;
    if (wxObject.name == "Chicago") {
        if (/\8\d\d/.test(conditions) == true) {
            newimage = images.chicago.clear
        }
        else {
            newimage = images.default
        };
    }
    else {
        newimage = images.default
    };
    document.body.style.background = "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('" + newimage + "')";
    document.body.style.backgroundSize = "cover"
    //alert(wxObject.weather[0].id); // This will print out the raw response you got from the server. You should delete this line later.     
	// To find out what the response looks like, you can also manually enter a query into your browser. Like this:
    // http://api.openweathermap.org/data/2.5/weather?zip=61801,US&appid=<yourkeygoeshere>	
	// You should use the wxObject object for your further coding. 
    
	}   

function processError(){
    // We never call this function either. It gets started if we encounter an error while retrieving info  
    // from the weather API.   
    // You can use this function to display an error message and image if something goes wrong
	}   


	
	
	
	
	
	
	
	







function jsonRequest(url)
{
    var con = new XMLHttpRequest();
    // The following is a function within an event handler within an object. 
	// We have not covered this in class, but basically this nested function
	// will get called whenever the "state" of the connection changes - usually 
	// that means that we either got a valid response or an error message. 
	// Sometimes a connection will time out and then this never gets called.
    con.onreadystatechange = function()
    {
        if (con.readyState === XMLHttpRequest.DONE) {
            // A connection's state can change multiple times, so we need to check whether 
			// it is now done and whether the response was a good one (status 200 means everyhting is great)
    		if (con.status === 200) {
                    // If we have a good response, we take the JSON string and convert it to an object.
					// We then call the processResponse function to analye the received data
  			        processResponse(JSON.parse(con.responseText),con.responseText);
            } else {

  			        processError();
            }
        }
    };
    // This opens the connection to teh server and sends the actual request:
    con.open("GET", url, true);
    con.send();
}