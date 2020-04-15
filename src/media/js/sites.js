(function () {
	  var map, pulsing_dot, size;
        map = new mapboxgl.Map({
            container: map_container_name,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [map_center_longitude, map_center_latitude],
            zoom: map_center_zoom,
        }),
        pulsing_dot = {
            width: size = 50,
            height: size,
            data: new Uint8Array(size * size * 4),
            onAdd: function () {
                var canvas;
                (canvas = document.createElement("canvas")).width = this.width, canvas.height = this.height, this.context = canvas.getContext("2d")
            },
            render: function () {
                var t, duration, outerRadius, radius, s;
                return duration = 1000,
                    s = performance.now() % duration / duration,     
                    outerRadius = size / 2 * .7 * s + (radius = size / 2 * .3),
                    (t = this.context).clearRect(0, 0, this.width, this.height), 

                    //draw outer circle
                    t.beginPath(), 
                    t.arc(this.width / 2, this.height / 2, outerRadius, 0, 2 * Math.PI), 
					t.fillStyle = "rgba(0, 255, 0,1" - s + ")",
					t.fill(),
					
                    //draw inner circle
                    t.beginPath(), 
                    t.arc(this.width / 2, this.height / 2, radius, 0, 2 * Math.PI),
                    t.fillStyle = "rgba(139, 0, 139, 1)",
                    t.strokeStyle = "green",
                    t.lineWidth = 2 + 4 * (1 - s),
                    t.fill(),
                    t.stroke(),
                    this.data = t.getImageData(0, 0, this.width, this.height).data, map.triggerRepaint(), !0
            }
        },
        map.on("load", function () {
//            map.addImage("pulsing-dot", pulsing_dot, { pixelRatio: 2 }),
            // reload every 5000 milisec
            window.setInterval(function () { map.getSource("sites").setData(sites_data_url) }, 5000),
            map.addSource("sites", { 
                    type: "geojson",
                    data: sites_data_url
                    }), 
//            map.addLayer({
//                    id: "sites",
//                    type: "symbol",
//                    source: "sites",
//                    layout: { "icon-image": "pulsing-dot" }
//                    }),


			map.addLayer({
					'id': 'sites',
					'type': 'circle',
					'source': 'sites',
					'paint': {
						'circle-radius': 10,
                        // color circles if it is connected, using data-driven styles
						'circle-color': {
							'property': 'is_connected_to_vpn',
							'type': 'categorical',
							'stops': [
								[true, '#00ff00'],
								[false, '#ff0000']]
						} 
					}
				}),
				
            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on("click", "sites", function (t) {
                    var coordinates, 
                        device_id,
                        device_name,
                        device_environment,
                        device_connection;
                    for (coordinates = t.features[0].geometry.coordinates.slice(), 
						 device_name = t.features[0].properties.device_name,
                         device_environment = t.features[0].properties.environment,
						 device_connection = t.features[0].properties.is_connected_to_vpn,
                         device_id = t.features[0].properties.id; 180 < Math.abs(t.lngLat.lng - coordinates[0]);) coordinates[0] += t.lngLat.lng > coordinates[0] ? 360 : -360;
                    
					(new mapboxgl.Popup).setLngLat(coordinates).setHTML("<h6>" + device_name + "</h6><p>Environment: " + device_environment + "</BR>Device ID: " + device_id + "</BR>Connection Active: "+ device_connection +"</BR>LAT: " + coordinates[0] + "</BR>LNG: " + coordinates[1] + "</BR></p>").addTo(map)
                }),
				
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "sites", function () { map.getCanvas().style.cursor = "pointer" }),
            
			// Change it back to a pointer when it leaves.  
            map.on("mouseleave", "sites", function () { map.getCanvas().style.cursor = "" })
        })
}).call(this);
