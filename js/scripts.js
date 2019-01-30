/*global $*/

$(function() {
   getGoogleSheetData();
});


function getGoogleSheetData() {
    var spreadsheetID = '1OsMJUGcDA5HzP1ymc6vSXQ9XFb5OnSrvfm2rBFrI2Ng';
    var worksheetID = 'orfa4yj';
    var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + worksheetID + '/public/values?alt=json';
    
    $.getJSON(url, function(data) {
       $.each(data.feed.entry, function(i, val) {
           var test = val.gsx$yourname.$t;
           //var lat = val.gsx$lat.$t;
           //var lng = val.gsx$lng.$t;
           $('#main').append(test + '<br>');
       });
       
       
    });
}