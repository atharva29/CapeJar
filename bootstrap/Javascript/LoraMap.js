var mapVar;
var ws = new WebSocket("wss://rocky-bayou-81460.herokuapp.com/ws")
ws.onmessage = function (event) {
    info = JSON.parse(event.data);
    console.log(info);
    addMarker(info);
}

function addMarker(properties) {
    var Color;
    switch (properties.Color) {
        case 1:
            Color = "Images/dustYellow.png"
            break;
        case 2:
            Color = "Images/dustbinBlue.png"
            break;
        case 3:
            Color = "Images/dustBlack.png"
            break;
        case 4:
            Color = "Images/dustRed.png"
            break;
        default:
    }
    console.log(Color);
    console.log(mapVar);
    console.log(properties.Message);
    var markerVar = new google.maps.Marker({
        position: {
            lat: properties.Lat,
            lng: properties.Lnd
        },
        map: mapVar,
        icon: Color
    });
    // if (Color) {
    //   markerVar.setIcon(properties.iconImage);
    // }
    var infoWindow = new google.maps.InfoWindow({
        content: properties.Message
    });

    if (properties.Message) {
        markerVar.addListener('mouseover', function () {
            infoWindow.open(mapVar, markerVar);
        });
    }
    markerVar.addListener('mouseout', function () {
        infoWindow.close(mapVar, markerVar);
    });
    markerVar.addListener('click', function () {
        //  document.getElementById('myModal').modal('show');
        $("#myModal").modal();
        document.getElementById('bar').style.width = 50 + "%";
        document.getElementById("label").innerHTML = (50 * 1) + '%';

    });
}

// ws.send("Say hi to sever");
function initMap() {
    var options = {
        zoom: 13,
        center: {
            lat: 19.022,
            lng: 72.856
        }
    }
    mapVar = new google.maps.Map(document.getElementById('map'), options);
    console.log(mapVar);
    // var markers = [{
    //     coords: {
    //       lat: info.Lat,
    //       lng: info.Lnd
    //     },
    //     iconImage : "images/dustYellow.png",
    //     content: '<h1>VJTI</h1>'
    //   },
    //   {
    //     coords: {
    //       lat: 19.0091,
    //       lng: 72.8157
    //     },
    //     iconImage : "images/dustRed.png",
    //     content: '<h1>Worli Sea Face </h1>'
    //   },
    //   {
    //     coords: {
    //       lat: 19.04423,
    //       lng: 72.86456
    //     },
    //     iconImage : "images/dustBlack.png",
    //     content: '<h1>Sion Mumbai</h1>'
    //   },
    //   {
    //     coords: {
    //       lat: 19.40423,
    //       lng: 72.86456
    //     },
    //     iconImage : "images/dustBlue.png",
    //     content: '<h1>Sion Mumbai</h1>'
    //   }
    // ];

    // for (var i = 0; i < markers.length; i++) {
    //   addMarker(markers[i]);
    // }
}
