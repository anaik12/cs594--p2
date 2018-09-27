    L.mapbox.accessToken = 'pk.eyJ1IjoiYW5haWszIiwiYSI6ImNqbWNkNTZ0bDBlM2Izb3M0MWQzNHZtYzEifQ.fLozOxjrg08I3StfKz0AhA'
    var map = L.mapbox.map('map', 'mapbox.dark', {maxZoom: 18, minZoom: 0})
    .setView([39.8283, -98.5795], 4);

    function project(latlng){
        // var array = [+latlng.lat, +latlng.lon];
        // console.log(array);
        // console.log(L.latLng(latlng));
        var point = map.latLngToLayerPoint(L.latLng(latlng));
        // console.log(point);
        return point;
    }

    
    var svg = d3.select(map.getPanes().overlayPane)
    .append("svg");

    var g = svg.append("g").attr("class", "leaflet-zoom-hide");

    d3.csv("SlateGunDeaths.csv",function(err, data){
       
        statesData = d3.nest()
    .key(function(d) { return d.state; })
    // .rollup(function(leaves) { return leaves.length; })
    .entries(data);

    var states = d3.nest()
    .key(function(d) { return d.state; })
    .rollup(function(leaves) { return leaves.length; })
    .entries(data);

    console.log(states[0]);

    var aggreStateLat = d3.nest()
  .key(function(d) { return d.state; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.lat; }); })
  .entries(data);

  var aggreStateLng = d3.nest()
  .key(function(d) { return d.state; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.lng; }); })
  .entries(data);

    minDeathCountperState = (d3.min(states, function(d) { return d.values; }));
    maxDeathCountperState = (d3.max(states, function(d) { return d.values; }));

    // function findvalues

    // function convertRadius(newr){
        var circRadius = d3.scale.linear()
        .domain([1,1446])
        .range([3,33]);


        var dots = g.selectAll("circle.dot").data(states)

        console.log(data[0]);
        dots.enter()
        .append("circle")

        function render(){
            var bounds = map.getBounds();
            var topLeft = map.latLngToLayerPoint(bounds.getNorthWest())
            var bottomRight = map.latLngToLayerPoint(bounds.getSouthEast())
            // console.log(bounds, topLeft, bottomRight)
            svg.style("width", map.getSize().x + "px")
            .style("height", map.getSize().y + "px")
            .style("left", topLeft.x + "px")
            .style("top", topLeft.y + "px");
            g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

            // function(d){
                // console.log(states);
            // }

            function findcoOrd(key){
                // console.log("key is", key);
                var lat   = findlat(key);
                var lng   = findlng(key);
                // console.log(lat);
                // console.log(lng);
                let coord = {};
                coord["lat"] = String(lat.toFixed(3));
                 coord["lng"] = String(lng.toFixed(3));
                return coord;
            }

            console.log("FC: ", findcoOrd("CO"));

           function findlat(lat){
                for(i in aggreStateLat ){
                    if(aggreStateLat[i].key == String(lat)){
                // console.log("My value is: ", aggreStateLat[i].values);
                return aggreStateLat[i].values;
            }
           }
        }

           function findlng(lng){
                for(i in aggreStateLng ){
                    if(aggreStateLng[i].key == String(lng)){
                // console.log("My value is: ", aggreStateLng[i].values);
                return aggreStateLng[i].values;
            }
           }

           }
           // console.log("checklat", findlat("CO"));

           // CO = "CO";
           // console.log("findlat", findlat(CO));

           var CO = aggreStateLng["CO"];
           // console.log(aggreStateLng.key);


           
                dots.attr({
                cx: function(d){ return project(findcoOrd(d.key)).x},
                cy: function (d){ return project(findcoOrd(d.key)).y},
                r: function(d){ return circRadius(d.values)},
                stroke: "red",
                fill: "blue" ,
                opacity: "0.4" ,
                hover: "red"            
            })
        }
        render();

        map.on("viewreset", function(){
            render();
        })
        map.on("move", function(){
            render();
        })

    
    // }

    console.log("newr",circRadius(1150));

    console.log(aggreStateLat[0].values, aggreStateLng[0].values, circRadius(states[0].values));



        // d3.select('body').append('div')
        // .append('select')
        // .on('change',change)
        // .selectAll('option')
        // .data(data)
        // .enter()
        // .append('option')
        // .attr('value',function (d) { return d.key })
        // .text(function (d) { return d.key })

        // function change() {

        //     console.log("Change: ", data);
        //     var value = this.value
        //     dataFiltered = data.filter(function (d) { return d.key === value })
        //     circles.data(dataFiltered[0].values)
        //     .transition().duration(1000)
        //     .attr('cx', function (d) { return d.cx })
        //     .attr('cy', function (d) { return d.cy })
        //     .attr('r', function (d) { return d.r })
        //     .attr('fill', function (d) { return d.color })
        // }


    //      let d_grade = 25;
    // let e_grade = 25;
    // let f_grade = 25;
    // let g_grade = 25;
    
    // var gSlider = d3.slider().value(g_grade)
    //    .max(100)
    //    .step(1)
    //    .axis(true)
    //     .on("slideend", function(evt,value) {
    //     let totalValue = value + f_grade+ d_grade + e_grade

    //      if (totalValue > 100){
           
    //        g_grade = 100 - f_grade - d_grade - e_grade;
           
    //      } else {
           
    //        g_grade = value;
           
    //      }

    //         gSlider.value(g_grade)
    //   })
    
        
    // d3.select('#ggrade')
    //   .call(gSlider)

    })