var map;
var geocoder;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];
var name = undefined;
//var origin1 = new google.maps.LatLng(55.930, -3.118);
var origin;
var destination;
//var destinationB = new google.maps.LatLng(50.087, 14.421);

var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

function initialize() {
  var opts = {
    center: new google.maps.LatLng(9.93123, 76.26730),
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  geocoder = new google.maps.Geocoder();
}

function calculateDistances(databaseName,name,origin,destination) {
  workerDatabaseName = databaseName;
  workerNameWithDistance = name;
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, calcDistance);
}
function calcDistance(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    //deleteOverlays();

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      //addMarker(origins[i], false);
      for (var j = 0; j < results.length; j++) {
        //addMarker(destinations[j], true);
        //console.log(results[j].distance.text);
        if(results[j].distance == undefined){
          
          var html ='<li class="nearestEmployeeList">Unable to find Address</li>';
          $("#nearestEmployeeAvailable").append(html);
        }else{
          var html ='<li onclick="getEmployee(this)" databaseName='+workerDatabaseName+' class="nearestEmployeeList">'+results[j].distance.text+'<span>'+workerNameWithDistance+'</span></li>';
          alert(results[j])
          $("#nearestEmployeeAvailable").append(html);
        }
 
      }
    }
  }
}

function addMarker(location, isDestination) {
  var icon;
  if (isDestination) {
    icon = destinationIcon;
  } else {
    icon = originIcon;
  }
  geocoder.geocode({'address': location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon
      });
      markersArray.push(marker);
    } else {
      alert('Geocode was not successful for the following reason: '
        + status);
    }
  });
}

function deleteOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

google.maps.event.addDomListener(window, 'load', initialize);