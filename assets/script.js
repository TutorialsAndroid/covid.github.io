(function(){
			// Initialize Firebase
			var config = {
				apiKey: "AIzaSyCHn-YKUq4ADvka67aJCCs51dfaQR8hkXU",
				authDomain: "covid-19-web-app.firebaseapp.com",
				databaseURL: "https://covid-19-web-app.firebaseio.com",
				projectId: "covid-19-web-app",
				storageBucket: "covid-19-web-app.appspot.com",
				messagingSenderId: "840406494852",
				appId: "1:840406494852:web:8630fb4428debb82b21cd1",
				measurementId: "G-ZPTYVJK3MN"
			};
			firebase.initializeApp(config);
   
    /* Data Event Listeners Start */
		//Data Object Change Listener
		const total_cases_object = document.getElementById('total_cases');
		const total_deaths_object = document.getElementById('total_deaths');
		const countries_cases_object = document.getElementById('countries_with_cases');
		
		//Data References
		const total_cases = firebase.database().ref().child('/database/total_cases');
		const total_deaths = firebase.database().ref().child('/database/total_deaths');
		const countries_with_cases = firebase.database().ref().child('/database/countries_with_cases');
		
 
		<!-- Total Cases Fetch -->
		total_cases.on('value', snap => {
			console.log(snap.val()); 
			total_cases_object.innerText = JSON.stringify(snap.val(), null, 3);
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		<!-- Total Deaths Fetch -->
		total_deaths.on('value', snap => {
			console.log(snap.val()); 
			total_deaths_object.innerText = JSON.stringify(snap.val(), null, 3);
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		<!-- Total Countries With Affected Fetch -->
		countries_with_cases.on('value', snap => {
			console.log(snap.val()); 
			countries_cases_object.innerText = JSON.stringify(snap.val(), null, 3);
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		/* Stop Fetching Database */
}());