var http = require('http');

function printMessage(zipcode, temp, skies) {
	var message = zipcode + " has a temp of " + temp + " degress, and " + skies + " skies today.";
	console.log(message);
}

function printError(error) {
	console.log(error.message);
}


function lookup(zip) {
	var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip="+ zip +",us", function(response) {
		var body = "";

		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					var profile = JSON.parse(body);
					printMessage(profile.name, profile.main.temp, profile.weather[0].main);
				} catch(error) {
					printError(error);
				}
			}
		});
	});

	request.on("error", printError);
}


module.exports.lookup = lookup;