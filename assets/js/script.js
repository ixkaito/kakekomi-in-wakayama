var data = 'data.csv';

/*
================================================================================
  Current Time
================================================================================
*/
var now = new Date();
var hour   = ('0' + now.getHours()).slice(-2);
var minute = ('0' + now.getMinutes()).slice(-2);

// var viewTime = document.getElementById('time');
// viewTime.innerHTML = hour + ':' + minute;

// Initialize google map
var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 34.2321, lng: 135.1911 },
  zoom: 11
});

// Visualize the heatmap of current time
kakekomiMap(data, hour, minute);


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
  Select time
================================================================================
*/
var selectHour    = document.getElementById('hour');
var selectMinute  = document.getElementById('minute');
var submitSetting = document.getElementById('submit-setting');

selectHour.value = now.getHours();
selectMinute.value = Math.floor(now.getMinutes()/10)*10;

submitSetting.onclick = function() {
  var hour = selectHour.value;
  var minute = selectMinute.value;
  kakekomiMap(data, hour, minute);
  return false;
};


/*
================================================================================
  Visualize the heatmap
================================================================================
*/
function kakekomiMap(data, hour, minute) {
  var time = parseInt(hour, 10) * 60 + parseInt(minute, 10);

  d3.csv(data, function(error, data){

    // Renew google map
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: map.getCenter().lat(), lng: map.getCenter().lng() },
      zoom: map.getZoom()
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
