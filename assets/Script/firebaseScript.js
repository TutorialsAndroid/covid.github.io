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
		
		//Data References Of Stat
		const total_cases = firebase.database().ref().child('/database/total_cases');
		const total_deaths = firebase.database().ref().child('/database/total_deaths');
		const countries_with_cases = firebase.database().ref().child('/database/countries_with_cases');
		const timeStamp = firebase.database().ref().child('/database/timeStamp');
		
		//Data References Of Top5 Country
		const country1 = firebase.database().ref().child('/database/country/country1');
		const country2 = firebase.database().ref().child('/database/country/country2');
		const country3 = firebase.database().ref().child('/database/country/country3');
		const country4 = firebase.database().ref().child('/database/country/country4');
		const country5 = firebase.database().ref().child('/database/country/country5');
 
		<!-- Total Cases Fetch -->
		total_cases.on('value', snap => {
			console.log(snap.val());   
			document.getElementById("total_cases").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		<!-- Total Deaths Fetch -->
		total_deaths.on('value', snap => {
			console.log(snap.val());
			document.getElementById("total_deaths").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		<!-- Total Countries With Affected Fetch -->
		countries_with_cases.on('value', snap => {
			console.log(snap.val());
			document.getElementById("countries_with_cases").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		<!--TimeStamp -->
		timeStamp.on('value', snap => {
			console.log(snap.val());
			document.getElementById("timeStamp").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		<!-- Here we fetch data for top5 country -->
		country1.on('value', snap => {
			console.log(snap.val()); 
			document.getElementById("country1").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		country2.on('value', snap => {
			console.log(snap.val()); 
			document.getElementById("country2").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		country3.on('value', snap => {
			console.log(snap.val()); 
			document.getElementById("country3").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		country4.on('value', snap => {
			console.log(snap.val()); 
			document.getElementById("country4").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		
		country5.on('value', snap => {
			console.log(snap.val()); 
			document.getElementById("country5").innerHTML = snap.val();
		}, function(error) {
		
		// The fetch failed.
		console.error(error);
		});
		/* Stop Fetching Database */
}());