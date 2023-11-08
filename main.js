function initMap() {
    var mapOptions = {
      center: {
        lat: 27.174977,
        lng: 78.042064
      },
      zoom: 8
    };
    var map15 = new google.maps.Map(document.getElementById("map"), mapOptions);
    var markers = []
    google.maps.event.addListenerOnce(map15, 'bounds_changed', function() {
      function getRandom(min, max) {
        return Math.random() * (max - min + 1) + min;
      }
      var bounds = map15.getBounds();
      for (var j = 0; j < 30; j++) {
  
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(getRandom(bounds.getSouthWest().lat(), bounds.getNorthEast().lat()),
            getRandom(bounds.getSouthWest().lng(), bounds.getNorthEast().lng())),
          map: map15
        });
        markers.push(marker);
      }
  
    })
  
    var polygon = new google.maps.Polygon({
      strokeColor: "#1E41AA",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: map15,
      fillColor: "#2652F2",
      fillOpacity: 0.6
    });
  
    var poly = polygon.getPath();
  
    function addPolyPoints(e) {
      poly.push(e.latLng);
      var markerCnt = 0;
      for (var i=0; i<markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].getPosition(), polygon)) {
        markerCnt++;
        }
      }
      document.getElementById('info').innerHTML = "markers in polygon: "+markerCnt;
      console.log("markers in polygon: "+markerCnt)
    }
  
    google.maps.event.addListener(map15, 'click', addPolyPoints);
  }
  
  google.maps.event.addDomListener(window, "load", initMap);
  