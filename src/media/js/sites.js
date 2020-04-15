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
                    t.fillStyle = "rgba(153, 50, 204,1" - s + ")", 
                    t.fill(), 
                    //draw inner circle
                    t.beginPath(), 
                    t.arc(this.width / 2, this.height / 2, radius, 0, 2 * Math.PI),
                    t.fillStyle = "rgba(139, 0, 139, 1)",
                    t.strokeStyle = "white",
                    t.lineWidth = 2 + 4 * (1 - s),
                    t.fill(),
                    t.stroke(),
                    this.data = t.getImageData(0, 0, this.width, this.height).data, map.triggerRepaint(), !0
            }
        },
        map.on("load", function () {
            map.addImage("pulsing-dot", pulsing_dot, { pixelRatio: 2 }),
            // reload every 5000 milisec
            window.setInterval(function () { map.getSource("ships").setData(sites_data_url) }, 5000),
            map.addSource("ships", { 
                    type: "geojson",
                    data: sites_data_url
                    }), 
            map.addLayer({
                    id: "ships",
                    type: "symbol",
                    source: "ships",
                    layout: { "icon-image": "pulsing-dot" }
                    }), 
            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on("click", "ships", function (t) {
                    var coordinates, heading, name;
                    for (coordinates = t.features[0].geometry.coordinates.slice(), name = t.features[0].properties.name,
                         heading = t.features[0].properties.heading; 180 < Math.abs(t.lngLat.lng - coordinates[0]);) coordinates[0] += t.lngLat.lng > coordinates[0] ? 360 : -360;
                    (new mapboxgl.Popup).setLngLat(coordinates).setHTML("<h6>" + name + "</h6><p>LAT: " + coordinates[0] + "</br>LNG: " + coordinates[1] + "</br>Heading: " + heading + "</p>").addTo(map)
                }),
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "ships", function () { map.getCanvas().style.cursor = "pointer" }),
            // Change it back to a pointer when it leaves.  
            map.on("mouseleave", "ships", function () { map.getCanvas().style.cursor = "" })
        })
}).call(this);
