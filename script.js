function getWeather(){
    // This function gets called when the "Get Weather" button the the HTML page is clicked.
	// First, we need to retrieve the desired ZIP code from the page:
    // And now we can build the query to send to the weather API. An API is an interface that 
	// lets us talk to a different machine - in this case one that provides weather data
	// If you want to try this code, you MUST get your own API key from openweathermap.org
	// and put it in place of the <yourkeygoeshere> placeholder !!!!!!!!!!!!!!!!!!!!!!!!!!
  	var url = "http://api.openweathermap.org/data/2.5/weather?zip=<yourzipcodegoeshere>,US&appid=<yourkeygoeshere>";
    // Now that we have a nice query, we can send it to the server. Note that this function will terminate
	// right after the request is sent.
	jsonRequest(url);
    // jsonRequest is a function that handles the actual communication with the server. 
	// You can take a look at it at the bottom of this file if you like.
}

function processResponse(wxObject,rawResponse){
    // We never call this function. It gets "magically" started as soon as we receive the response 
    // from the weather API. This happens asynchronously.  
    alert(rawResponse); // This will print out the raw response you got from the server. You should delete this line later.     
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