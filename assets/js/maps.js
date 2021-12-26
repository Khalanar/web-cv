// var = "AIzaSyCu4A0SivFkO31p_b-hN1DYJPG3-CGkxbw"
function initMap(){
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 47.4386509,
            lng: 5.1003559
        }
    });
    
    var labels = "ABCDEFGHIJKLMNOPQESTUVWXYZ"
    
    var locations = [
            {lat: 41.4092570, lng:2.1908891}, //barcelona
            {lat: 51.8959843, lng:-8.5330894}, //cork
            {lat: 53.3239919, lng:-6.5258788}, //dublin
            {lat: 35.6860113, lng:139.7799982}, //Japan
        ];
    
    var markers = locations.map(function(location, i){
        return new google.maps.Marker({
            position: location,
            label: labels[i%labels.length]
        })
    })
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}

