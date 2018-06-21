function main() {
  var ws = new WebSocket("ws://localhost:3000/ws1")
  var info = {};
  ws.onmessage = function(event) {
    console.log(event.data);
    info = JSON.parse(event.data);
    console.log(info.Lat);
    initMap(info)
  }
}


function initMap(info) {
  var options = {
    zoom: 12,
    center: {
      lat: 19.022,
      lng: 72.856689
    },
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ['roadmap', 'terrain', 'hybrid', 'satellite']
    },
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    }
  }



  // New Map
  var map = new google.maps.Map(document.getElementById('map'), options);
  //Listen for click on map
  google.maps.event.addListener(map, 'click', function(event) {
  //Add marker
    addMarker({
      coords: event.latLng
    })
  });

  //Recieved object by Parsing String
  //Following is JSON Object
  var myStr = {

    "loc": [{
        "content": "<h3> VJTI chi Kachra Kundi </h3>",
        "lat": info.Lat,
        "lng": info.Lng,
        "iconImage": 'images/dustBlack.png'
      },
      {
        "content": "<h3> DADAR chi Kachra Kundi </h3>",
        "lat": 19.0213,
        "lng": 72.84243,
        "iconImage": 'images/dustBlue.png'
      },
      {
        "content": "<h3> DOMBIVLI chi Kachra Kundi </h3>",
        "lat": 19.0213,
        "lng": 72.86243,
        "iconImage": 'images/dustYellow.png'
      }
    ]
  }




  //  Add markers by gettings data from JSON object
  var m = 0;
  for (var m in myStr.loc) {

    var marker1 = {
      coords: {
        lat: myStr.loc[m].lat,
        lng: myStr.loc[m].lng
      },
      content: myStr.loc[m].content,
      iconImage: myStr.loc[m].iconImage
    };

    addMarker(marker1);
  }


  //Add marker Function

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      animation: google.maps.Animation.DROP

    });

    //Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content,
      });

      marker.addListener('mouseover', function() {
        infoWindow.open(map, marker, content);
      });

      marker.addListener('mouseout', function() {
        infoWindow.close(map, marker, content);
      });
    }



    //Check for custom icon image
    if (props.iconImage) {
      //Set Icon image
      marker.setIcon(props.iconImage);
    }
  }
}
