/*
================================================================================
  Current Time
================================================================================
*/
var now = new Date();
var hour   = ('0' + now.getHours()).slice(-2);
var minute = ('0' + now.getMinutes()).slice(-2);

var viewTime = document.getElementById('time');
viewTime.innerHTML = hour + ':' + minute;

// Visualize the heatmap of current time
kakekomiMap(hour, minute);


/*
================================================================================
  Convert time format to minutes
================================================================================
*/
function time2minute(time) {
  time = time.split(':');
  time = parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
  return time;
}

/*
================================================================================
  Visualize the heatmap
================================================================================
*/
function kakekomiMap(hour, minute) {
  var time = parseInt(hour, 10) * 60 + parseInt(minute, 10);

  d3.csv('data.csv', function(error, data){

    // Initialize google map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.2321, lng: 135.1911 },
      zoom: 11
    });

    // Initialize heatmap data
    var pos, heatmapData = [];
    for (var i = 0; i < data.length; i++) {
      if (time2minute(data[i].open) <= time && time <= time2minute(data[i].close)) {
        heatmapData.push({
          location : new google.maps.LatLng(data[i].lat, data[i].lng),
          weight : 10
        });
      }
    }

    // Initialize heatmap layer
    var heatmap = new google.maps.visualization.HeatmapLayer({
      radius: 100,
      opacity: 0.75
    });

    // Set the heatmap data to the heatmap layer
    heatmap.setData(heatmapData);

    // Overlay the heatmap
    heatmap.setMap(map);

  });
}
