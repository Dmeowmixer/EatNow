var map;
var infowindow;
var PLACE_MAX_WIDTH = 75;
var PLACE_MAX_HEIGHT = 50;

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 16
  });

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var request = {
        location: pos,
        radius: 1000,
        types: ['food','restaurant']
      };
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, searchRes);

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


function searchRes(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var nearbyPlaces = results.map(function(place){
      createMarker(place);
      var photos = [];
      if(place.photos){
        photos = place.photos.map(function(photo){
          return {
            url : photo.getUrl({ maxWidth : PLACE_MAX_WIDTH, maxHeight : PLACE_MAX_HEIGHT }),
            width : photo.width,
            height : photo.height
          }
        });
      }
      return {
        name : place.name,
        rating : place.rating,
        types : place.types,
        vicinity : place.vicinity,
        photos : photos,
        icon : place.icon
      }
    });

    console.log('Merry Christmas team EatNow!');
    console.log('HTH! Enjoy! and create great things!');
    console.log('nearbyPlaces',nearbyPlaces);
    console.log('nearbyPlaces as json', JSON.stringify(nearbyPlaces));

  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
