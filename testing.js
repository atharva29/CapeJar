
function addMarker(properties) {
  var Color;
  switch (properties.Color) {
    case 1:
      Color = "images/dustYellow.png"
      break;
    case 2:
      Color = "images/dustbinBlue.png"
      break;
    case 3:
      Color = "images/dustBlack.png"
      break;
    case 4:
      Color = "images/dustRed.png"
      break;
    default:
  }
  var markerVar = new google.maps.Marker({
    position: {
      lat: properties.Lat,
      lng: properties.Lng
    },
    map: mapVar,
    icon: Color
  });
  var infoWindow = new google.maps.InfoWindow({
    content: properties.Message
  });
  if (properties.Message) {
    markerVar.addListener('mouseover', function() {
      infoWindow.open(mapVar, markerVar);
    });
  }
  markerVar.addListener('mouseout', function() {
    infoWindow.close(mapVar, markerVar);
  });

}

function initMap() {
  var options = {
    zoom: 8,
    center: {
      lat: 19.022,
      lng: 72.856
    }
  }
  mapVar = new google.maps.Map(document.getElementById('map'), options);
  console.log(mapVar);
}

var mapVar;
var ws = new WebSocket("ws://localhost:3000/ws1")
ws.onmessage = function(event) {
  var info = JSON.parse(event.data);
  console.log(info);
  addMarker(info);
  }
