// Notes go above each line it describes.
console.log("Hello worldzz!")

//1 - We want to get a valid api key from our source.  For this app we will use https://congress.api.sunlightfoundation.com
// var apiKey = d9d58f08dcaa4cd58978ae7956c4071b


//Now that we have loaded jQuery into our HTML, we now have access to jQuery methods.  the $ sign represents jQuery as an object with all the commands available to us.
console.log($)

//2 - We will make our data request, or JSON request and store that request in a 'promise'.  Make SURE we are looking in the right place sunlightfoundation.com/legislators/?apikey=  ( our key )
var congressionalPromise = $.getJSON('https://congress.api.sunlightfoundation.com/legislators/?apikey=d9d58f08dcaa4cd58978ae7956c4071b')


//With the promise, will will later use a .then method with it, which basically ques a function to happen after we receive a response from the JSON request.
var statesContainer = document.querySelector(".statesContainer")

//4- We now will define handleData's actions once congressionalPromise has returned with data. 
var handleData = function(apiResponse) {
	console.log(apiResponse)
	var legislatorArray = apiResponse.results

	var htmlString = '<h1 class="title">We have '  + apiResponse.count + ' congressional cuties to show you today!</h1>'
		htmlString += '<input type="text" class="searchBar" placeholder="Enter zip code"/>'
	for (var i = 0; i < legislatorArray.length; i++) {
		var legislatorObject = legislatorArray[i]
		console.log(legislatorObject.state_name)

		htmlString += '<div class="legislatorBox">'
		htmlString += '<h1>' + legislatorObject.state_name + '</h1>'
		htmlString += '<h2>' + legislatorObject.first_name + ' ' + legislatorObject.last_name + '</h2>'
		htmlString += "<ul>"
		htmlString += '<li> Office: ' + legislatorObject.office + '</li>'
		htmlString += '<li> Term Begin: ' + legislatorObject.term_start + '</li>'
		htmlString += '<li> Term End: ' + legislatorObject.term_end + '</li>'
		htmlString += '<li> Phone: ' + legislatorObject.phone + '</li>'
		htmlString += '</ul>'
		
		htmlString += '</div>'
	}
	//Remember that we use .innerHTML instead of .textContent because .innerHTML will parse out the readable code and run it, vs where .textContent will literally display what is entered into it.
	statesContainer.innerHTML = htmlString
}

//3 - Invoke what happens after the promise returns with Data, which is handleData 
congressionalPromise.then(handleData)