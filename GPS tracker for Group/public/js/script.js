const socket = io();

// Initialize Leaflet map
const map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Location Tracking",
}).addTo(map);

// Store markers for each user
const markers = {};

// Function to update or create a marker
function updateMarker(id, latitude, longitude) {
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]); // Update existing marker
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map); // Create new marker
    }
}

// Send user location
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Sending location:", { latitude, longitude });
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
} else {
    console.error("Geolocation is not supported.");
}

// Listen for location updates
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    console.log("Updating marker for:", id, latitude, longitude);
    updateMarker(id, latitude, longitude);
});

// Remove marker when a user disconnects
socket.on("user-disconnected", (id) => {
    console.log("Removing marker for:", id);
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
