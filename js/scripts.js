/*global $*/
/*global L*/

/*
 * Initialize Map
 */
L.mapbox.accessToken = 'pk.eyJ1IjoibWF0aWtpbjkiLCJhIjoiYjMyMjBjZTE4NWUxMDkxOWZjZjFjZWEzZTcxNDUxOTkifQ._ldFl3e17jCs7aWm6zMZ3Q';
var mymap = L.map('map-display').setView([34.0522, -118.2437], 9);
L.mapbox.styleLayer('mapbox://styles/matikin9/cim5bt1q100iy9jkpl7ff9d1h').addTo(mymap);
var markers = [];

// Warnings
var warningString = '';

$(function() {
   getGoogleSheetData();
});


function getGoogleSheetData() {
    /*
    https://spreadsheets.google.com/feeds/worksheets/1OsMJUGcDA5HzP1ymc6vSXQ9XFb5OnSrvfm2rBFrI2Ng/public/basic?alt=json
    https://spreadsheets.google.com/feeds/list/1OsMJUGcDA5HzP1ymc6vSXQ9XFb5OnSrvfm2rBFrI2Ng/ob55q1q/public/values?alt=json
    */
    
    var spreadsheetID = '1OsMJUGcDA5HzP1ymc6vSXQ9XFb5OnSrvfm2rBFrI2Ng';
    var worksheetID = 'ob55q1q'; // Sheet 1: orfa4yj
    var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + worksheetID + '/public/values?alt=json';
    
    $.getJSON(url, function(data) {
       $.each(data.feed.entry, function(i, val) {
           displayOnPage(val);
       });
    });
    
    $('#main').append('<strong>Warnings: </strong><br>' + (warningString == '' ? 'No errors!' : warningString) + '<br><br>');
}

function displayOnPage(row, warningString) {
    var name = row.gsx$name.$t;
    
    for (var i=1; i<5; i++) {
        var lat = row['gsx$location' + i + 'lat'].$t;
        var lng = row['gsx$location' + i + 'lng'].$t;
        var locationName = row['gsx$location' + i + 'name'].$t;
        
        if (lat == '' || lng == '') {
            warningString += name + ' has no coordinates for Location ' + i + '.<br>';
        } else {
            var $locationInfo = $("<div>", {
               "id": name.replace(/\s+/g, '') + i,
               "class": "location-data"
            });
            
            $locationInfo.append('<h1>' + locationName + '</h1>');
            
            var m = L.marker([lat, lng])
                .bindPopup($locationInfo[0])
                .addTo(mymap);
            
            markers.push(m);
        }
    }
}

