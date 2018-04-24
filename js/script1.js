var map;
//var infowindow;
function initMap() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(function(position) {
                var myLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setPos(myLocation);
            });
        } catch (err) {
            var myLocation = {
                lat: 23.8701334,
                lng: 90.2713944
            };
            setPos(myLocation);
        }
    } else {
        var myLocation = {
            lat: 23.8701334,
            lng: 90.2713944
        };
        setPos(myLocation);
    }
}
var contentString = 'Number of Ambulance Availabe='+ Math.ceil((Math.random() * 10) + 1);

var source = document.getElementById("source").value;

function setPos(myLocation) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 10
    });
    //  infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLocation,
        radius: 4000,
        types: ['hospital']
    }, processResults);

}

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        for (var i = 0; i < results.length; i++){
            createMarkers(results);
        }
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });


        // marker.addListener(marker, 'click', function() {
        //     console.log('hi');
        //     //    infowindow.open(marker.get('map'), marker);
        //     //var infiwindow=new google
        //     // infowindow.setContent(place.name);
        //     // infowindow.open(map, this);
        //
        // });

        bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);

}
google.maps.event.addDomListener(window, 'load', initialize)