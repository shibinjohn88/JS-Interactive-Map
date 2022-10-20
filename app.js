



//UI submit button event listener
document.querySelector('#submit').addEventListener('click', showBusiness)

function showBusiness() {
    event.preventDefault()
    let value = document.querySelector('#business').value
    console.log(value)
    console.log(event)
}

//get users coordinates

async function getUserCoordinates() {
    const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [position.coords.latitude, position.coords.longitude]

}




window.onload = async () => {

    //create a map with tile
    const myMap = L.map('map', {
        center: await getUserCoordinates(),
        zoom: 12,
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap)

    const marker = L.marker(await getUserCoordinates())
    marker.addTo(myMap).bindPopup('<p1><b>You are here!</b></p1>').openPopup()

}

