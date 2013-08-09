requirejs.config({
    baseUrl: '/m2m-nitro-components'
});
define(
[
    'components/dashboard/map',
    'libs/mapbox-1.3.1'

],
function() { requirejs(['components/jquery_plugins'], function() {
	
	
    var positions = [];
    var $ele = $('#map');
    $ele.m2mDashboardMap({
    	fitBounds: true,
    	tooltip: {
                  	component: 'Tooltip',
                    items: [{
                        tpl: '<div style="float: left"><div><b>{{value.marker.user}}</b></div><img src="{{value.marker.image}}" /></div>'+
                        	 '<div style="float:left; margin: 10px 5px; max-width: 250px; text-align:left;">{{value.marker.title}}</div>'
                    }]
                }
    });
    //L.mapbox.map($ele[0], 'keithtid.map-w594ylml');

    var socket = io.connect('http://localhost');
	socket.on('geolocation', function(data) {
		var json = JSON.parse(data);
	  	var pos = { 'cssClass' : 'red' , 
	  				'image':json.photo ,
	  				'user':json.user,
	  				'title': json.tweet, 
	  				'latitude' : json.geolocation.latitude , 
	  				'longitude' : json.geolocation.longitude
	  			};
		positions.push(pos);
		$ele.trigger('valueChange', {value:positions});
	});
    

});});
