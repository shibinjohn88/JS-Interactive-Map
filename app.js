
let myMap


//UI submit button event listener
document.querySelector('#submit').addEventListener('click', showBusiness)

async function showBusiness() {
    event.preventDefault()
    let value = document.querySelector('#business').value
    // console.log(value)
    let business = await getBusiness(value)
    // console.log(business.results)
    let places = mapBusiness(business.results)
    addPlaces(places)
    
   
}

//get users coordinates

async function getUserCoordinates() {
    const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [position.coords.latitude, position.coords.longitude]

}

async function getBusiness(business) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'your api key'
        }
      };
      let limit = 3
      let radius = 100
      let cord = await getUserCoordinates() 
      let latitude = cord[0]
      let longitude = cord[1]
      // console.log(latitude, longitude)
      let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${business}&limit=${limit}&ll=${latitude}%2C${longitude}&${radius}`, options)
      let result = await response.text()
      let busLocations = await JSON.parse(result)
      return busLocations
}

// map fetched business locations to a map
function mapBusiness(data) {
  let places = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return places

} 

//add business places to map
function addPlaces(places) {
  for (let i = 0; i < places.length; i++) {
    let marker = L.marker([places[i].lat, places[i].long])
    marker.addTo(myMap).bindPopup(`<p1>${places[i].name}</p1>`).openPopup()
  }
}
    
    
window.onload = async () => {

    //create a map with tile
     myMap = L.map('map', {
        center: await getUserCoordinates(),
        zoom: 12,
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap)

    const marker = L.marker(await getUserCoordinates())
    marker.addTo(myMap).bindPopup('<p1><b>You are here</b></p1>').openPopup()

}

