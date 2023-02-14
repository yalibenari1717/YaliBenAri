// ------------- Google MAP --------------------

// Create  Google Map on div id="map"
const API_KEY = "AIzaSyA-Un2aw3YY5ICina1CM3gtm9y1MyHasYg";
window.newTripLocation = null;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.0853, lng: 34.7818 },
    zoom: 12,
  });

  // Get username from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = getUsername();

  const markers = [];
  // Fetch all trips from the server by username
  fetch("http://localhost:3000/getAllTrips?username=" + username)
    .then((response) => response.json())
    .then((data) => {
      // For each trip, create a marker
      data.forEach((trip) => {
        const marker = new google.maps.Marker({
          position: { lat: trip.lat, lng: trip.lng },
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#FF0000",
            fillOpacity: 0.8,
            strokeOpacity: 0,
          },
        });

        markers.push(marker);

        // Add a click listener to the marker
        marker.addListener("click", function () {
          // Show info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
                        <div>
                            <h3>Destination: ${trip.destination}</h3>
                            <h3>Hotel: ${trip.hotel}</h3>
                            <h3>Username: ${trip.username}</h3>
                            <h3>Phone Number: ${trip.phoneNumber}</h3>
                            <h3>Night Life: ${trip.nightLife}</h3>
                            <h3>Landscape: ${trip.landscape}</h3>
                            <h3>Shopping: ${trip.shopping}</h3>
                            <h3>Final Grade: ${trip.finalGrade}</h3>
                            <h3>English: ${trip.english}</h3>
                            <h3>Hebrew: ${trip.hebrew}</h3>
                            <h3>Else: ${trip.else}</h3>
                            <h3>Dates: ${trip.dates}</h3>
                            <h3>Recommendations: ${trip.recommendations}</h3>
                            <h3>Description: ${trip.description}</h3>
                            <h3>Top 3: ${trip.top3}</h3>   
                            <button onclick="deleteTrip('${trip.id}')">Delete</button> 
                            <button onclick="editTrip('${trip.id}')">Edit</button>                        
                        </div>
                    `,
          });
          infoWindow.open(map, marker);
        });
      });
    });

  // Fit map to markers
  const bounds = new google.maps.LatLngBounds();
  markers.forEach((marker) => {
    bounds.extend(marker.getPosition());
  });

  map.addListener("click", function (event) {
    var location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (window.newTripLocation) {
      newTripLocation.setMap(null);
    }
    window.newTripLocation = new google.maps.Marker({
      position: location,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#FF0000",
        fillOpacity: 0.8,
        strokeOpacity: 0,
      },
    });
  });
}

// --------------- TRIPS -------------------
function editTrip(id) {
  // Redirect to the info fill page with the trip id
  window.location.href = `InfoFill.html?id=${id}`;
}

function deleteTrip(id) {
  console.log(id);
  fetch("http://localhost:3000/deleteTrip", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => {
    // Format res
    const data = res.json().then((data) => {
      window.location.reload();
    });
  });
}

function getTripById(id) {
  fetch("http://localhost:3000/getTripById?id=" + id)
    .then((response) => response.json())
    .then((data) => {
      // Fill the form with the trip data
      document.getElementById("destination").value = data.destination;
      document.getElementById("hotel").value = data.hotel;
      document.getElementById("username").value = data.username;
      document.getElementById("phoneNumber").value = data.phoneNumber;
      document.getElementById("nightLife").value = data.nightLife;
      document.getElementById("landscape").value = data.landscape;
      document.getElementById("shopping").value = data.shopping;
      document.getElementById("finalGrade").value = data.finalGrade;
      document.getElementById("english").value = data.english;
      document.getElementById("hebrew").value = data.hebrew;
      document.getElementById("else").value = data.else;
      document.getElementById("dates").value = data.dates;
      document.getElementById("recommendations").value = data.recommendations;
      document.getElementById("description").value = data.description;
      document.getElementById("top3").value = data.top3;
      document.getElementById("lat").value = data.lat;
      document.getElementById("lng").value = data.lng;
    });
}

function getSavedTripById(id) {
  fetch("http://localhost:3000/getTripById?id=" + id)
    .then((response) => response.json())
    .then((data) => {
      // Fill the form with the trip data
      document.getElementById("destination").innerHTML = data.destination;
      document.getElementById("hotel").innerHTML = data.hotel;
      document.getElementById("username").innerHTML = data.username;
      document.getElementById("phoneNumber").innerHTML = data.phoneNumber;
      document.getElementById("nightLife").innerHTML = data.nightLife;
      document.getElementById("nightLife").style.width = `${data.nightLife}%`;
      document.getElementById("landscape").innerHTML = data.landscape;
      document.getElementById("landscape").style.width = `${data.landscape}%`;
      document.getElementById("shopping").innerHTML = data.shopping;
      document.getElementById("shopping").style.width = `${data.shopping}%`;
      document.getElementById("finalGrade").innerHTML = data.finalGrade;
      document.getElementById("finalGrade").style.width = `${data.finalGrade}%`;
      document.getElementById("english").innerHTML = data.english;
      document.getElementById("english").style.width = `${data.english}%`;
      document.getElementById("hebrew").innerHTML = data.hebrew;
      document.getElementById("hebrew").style.width = `${data.hebrew}%`;
      document.getElementById("else").innerHTML = data.else;
      document.getElementById("else").style.width = `${data.else}%`;
      document.getElementById("dates").innerHTML = data.dates;
      document.getElementById("recommendations").innerHTML =
        data.recommendations;
      document.getElementById("description").innerHTML = data.description;
      document.getElementById("top3").innerHTML = data.top3;
      document.getElementById("lat").innerHTML = data.lat;
      document.getElementById("lng").innerHTML = data.lng;
    });
}

function fillinfo() {
  if (!window.newTripLocation) {
    alert("Please click on the map to choose a location");
    return;
  }

  // extract username from url
  const username = getUsername();
  const lat = window.newTripLocation.getPosition().lat();
  const lng = window.newTripLocation.getPosition().lng();

  // Redirect to the info fill page
  window.location.href = `InfoFill.html?username=${username}&lat=${lat}&lng=${lng}`;
}

// --------------- TRIPS -------------------

function addTrip() {
  const trip = {
    destination: document.getElementById("destination").value,
    hotel: document.getElementById("hotel").value,
    username: document.getElementById("username").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    nightLife: parseInt(document.getElementById("nightLife").value),
    landscape: parseInt(document.getElementById("landscape").value),
    shopping: parseInt(document.getElementById("shopping").value),
    finalGrade: parseInt(document.getElementById("finalGrade").value),
    english: parseInt(document.getElementById("english").value),
    hebrew: parseInt(document.getElementById("hebrew").value),
    else: parseInt(document.getElementById("else").value),
    dates: document.getElementById("dates").value,
    recommendations: document.getElementById("recommendations").value,
    description: document.getElementById("description").value,
    top3: document.getElementById("top3").value,
  };

  // if url has id, then it's an edit
  const url = window.location.href;
  const idKey = url.split("?")[1].split("=")[0];
  const id = url.split("?")[1].split("=")[1];

  if (idKey == "id") {
    // Edit
    trip.lat = document.getElementById("lat").value;
    trip.lng = document.getElementById("lng").value;
    fetch("http://localhost:3000/editTrip", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, trip }),
    }).then((res) => {
      // Format res
      const data = res.json().then((data) => {
        console.log(data);
        window.location.href = "MapPage.html?username=" + data.username;
      });
    });
  } else {
    // extract username from url, lat ,lng
    const username = getUsername();
    const lat = url.split("?")[1].split("&")[1].split("=")[1];
    const lng = url.split("?")[1].split("&")[2].split("=")[1];

    trip.username = username;
    trip.lat = lat;
    trip.lng = lng;

    // Create
    fetch("http://localhost:3000/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    }).then((res) => {
      // Format res
      const data = res.json().then((data) => {
        window.location.href = `TripSaved.html?id=${data.id}`;
      });
    });
  }
}

// --------------- LOCAL STORAGE -------------------

function saveUsername(username) {
  localStorage.setItem("username", username);
}

function getUsername() {
  return localStorage.getItem("username");
}
