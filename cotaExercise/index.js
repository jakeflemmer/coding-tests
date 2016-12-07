var ex1 = "John downloaded the Pokemon Go app on 07/15/2016. By 07/22/2016, he was on level 24. Initially, he was very happy with the app. However, he soon became very disappointed with the app because it was crashing very often. As soon as he reached level 24, he uninstalled the app.";
var ex2 = "Hua Min liked playing tennis. She first started playing on her 8th birthday - 07/07/1996. Playing tennis always made her happy. She won her first tournament on 08/12/2010. However, on 04/15/2015 when she was playing at the Flushing Meadows, she had a serious injury and had to retire from her tennis career.";
var index  = 1;

const MALE_PRONOUN = "he",
	FEMALE_PRONOUN = "she",
	POSITIVE_SENTIMENTS = ["happy", "glad","jubilant","satisfied"],
	NEGATIVE_SENTIMENTS = ["sad", "disappointed", "angry", "frustrated"];

parse(ex1);

parse(ex2);



/*
* parses plain text into a json object
* @params {string} text - the plain text to parse
* @return {object} - the json object with data
*/
function parse(text){
	var jsonOutput = {};

	// get the duration
	var datesArray = getDateObjectsArray(text);
	var duration = 0;
	if ( datesArray && datesArray.length > 1 )
	{
		duration = ( datesArray[datesArray.length-1] - datesArray[0] ) / (1000*60*60*24);
		duration += 1; // add a day to include the last date given
	}

	//get the gender
	var malePronoun = testMatch(text, [MALE_PRONOUN]);
	var femalePronoun = testMatch(text, [FEMALE_PRONOUN]);
	var gender = "unknown";
	if( malePronoun )
	{
		gender = "male";
	}
	if( femalePronoun )
	{
		if ( gender === "male") console.error("we have both male and female pronouns present")
		gender = "female";
	}

	// get the sentiment
	var sentiment = "unknown";
	var positiveSentiment = testMatch(text, POSITIVE_SENTIMENTS);
	var negativeSentiment = testMatch(text, NEGATIVE_SENTIMENTS);

	if ( positiveSentiment )
	{
		sentiment = "positive";
	}
	if ( negativeSentiment )
	{
		if ( sentiment == "positive" )
		{
			sentiment = "mixed";
		}else{
			sentiment = "negative";
		}
	}

	// assemble the output json object
	jsonOutput.timeDuration = duration;
	jsonOutput.gender = gender;
	jsonOutput.sentiment = sentiment;
	console.log("---------------------");
	console.log("output");
	console.log("---------------------");
	console.log(JSON.stringify(jsonOutput));


	//update the view
	var inp = document.getElementById("input"+index);
	inp.innerHTML += text;
	var out = document.getElementById("output"+index);
	out.innerHTML += JSON.stringify(jsonOutput);
	index++;

	return jsonOutput;
}



// util functions  ---------------------

function getDateObjectsArray(text){
	var results = text.match(/\d{2}([/])\d{2}\1\d{4}/g);
	if ( results )
	{
		for ( var i=0; i < results.length; i++)
		{
			results[i] = Date.parse(results[i]);
		}
	}
	//sort them chronoligically
	if ( results )
	{
		results.sort(function(a,b){
  			return a - b;
		});
	}
	return results;
}

function testMatch(text, array){
	for ( var i=0; i < array.length; i++)
	{
		var regex = new RegExp("\\b" + array[i] + "\\b","gi");
		if( regex.test(text) ) return true;
	}
	return false;
}