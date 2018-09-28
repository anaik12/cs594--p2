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

    var cities = d3.nest()
        .key(function(d) { return d.city; })
        .rollup(function(leaves) { return leaves.length; })
        .entries(data);


        var aggreCityLat = d3.nest()
        .key(function(d) { return d.city; })
        .rollup(function(v) { return d3.mean(v, function(d) { return d.lat; }); })
        .entries(data);

        var aggreCityLng = d3.nest()
        .key(function(d) { return d.city; })
        .rollup(function(v) { return d3.mean(v, function(d) { return d.lng; }); })
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


        function findcoOrdCity(key){
                    // console.log("key is", key);
                    var lat   = findlatCity(key);
                    var lng   = findlngCity(key);
                    // console.log(lat);
                    // console.log(lng);
                    let coord = {};
                    coord["lat"] = String(lat.toFixed(3));
                    coord["lng"] = String(lng.toFixed(3));
                    return coord;
                }

    function findlatCity(lat){
                    // console.log("inlat", lat);
                    for(i in aggreCityLat ){
                        if(aggreCityLat[i].key == String(lat)){
                    // console.log("My value is: ", aggreStateLat[i].values);
                    return aggreCityLat[i].values;
                }
            }
        }

    function findlngCity(lng){
            for(i in aggreCityLng ){
                if(aggreCityLng[i].key == String(lng)){
                    // console.log("My value is: ", aggreStateLng[i].values);
                    return aggreCityLng[i].values;
                }
            }

        }


    var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    // function findvalues

    // function convertRadius(newr){
        var circRadius = d3.scale.linear()
        .domain([1,1446])
        .range([3,33]);


        var circRadiusCities = d3.scale.linear()
        .domain([1,408])
        .range([4,40]);

        var dots = g.selectAll("circle.dot").data(cities)

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

           var aggreGender = d3.nest()
        .key(function(d) { return d.gender; })
        .key(function(d) { return d.city; })
        // .rollup(function(v) { return v.length; })
        .entries(data);

    

        var femaleDeathsInCity = aggreGender[0].values;
        var maleDeathsInCity = aggreGender[1].values;
        // console.log("2: ",femaleDeathsInCities.length);

        // aggreFemale[1].values[].values.length

        function genderCount(city){
            let count = {};
            for(i in femaleDeathsInCity){

                if(femaleDeathsInCity[i].key == city ){
                    // console.log("Fcount: ", femaleDeathsInCities[i].values.length );
                    count["female"] = femaleDeathsInCity[i].values.length;
                }

            }
            for(i in maleDeathsInCity){
                if(maleDeathsInCity[i].key == city ){
                    // console.log("Fcount: ", femaleDeathsInCities[i].values.length );
                    count["male"] = maleDeathsInCity[i].values.length;
                }
                
            }

            if(count["female"]==undefined){
                count["female"]=0;

            }
             if(count["male"]==undefined){
                count["male"]=0;

            }
            return count;
        }
           // console.log("checklat", findlat("CO"));

           // CO = "CO";
           // console.log("findlat", findlat(CO));

           var CO = aggreStateLng["CO"];
           // console.log(aggreStateLng.key);


           
                dots.attr({
                cx: function(d){ return project(findcoOrdCity(d.key)).x},
                cy: function (d){ return project(findcoOrdCity(d.key)).y},
                r: function(d){ return circRadiusCities(d.values)},
                stroke: "red",
                fill: "blue" ,
                opacity: "0.4" ,
               class: 'circle'              
            })
            .on("mouseover", function(d){   
                      d3.select(this).classed('active', true)
                      div.transition()      
                .duration(200)      
                .style("opacity", .9);      
                div .html("County: " + d.key + "<br/>" +"<br/>" + "No. of Deaths: " + d.values + "<br/>" + 
                "Female: " + (genderCount(d.key)).female +"<br/>"+ "Male: " + (genderCount(d.key)).male  )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 100) + "px");    

                  })
                   .on("mouseout", function(d){
                      d3.select(this).classed('active', false)
                      div.transition()      
                .duration(500)      
                .style("opacity", 0);   
                  });
        }
        render();

        map.on("viewreset", function(){
            render();
        })
        map.on("move", function(){
            render();
        })

    
    // }


        var deathCount = d3.nest()
        .key(function(d) { return d.gender; })
        .rollup(function(leaves) { return leaves.length; })
        .entries(data); 



        var ageGroup = d3.nest()
        .key(function(d) { return d.ageGroup; })
        .rollup(function(leaves) { return leaves.length; })
        .entries(data);

    var html = "";
        html    += "<table>";
        html    += "  <tr class='dead'><td>Total Deaths</td><td class='data'>" + data.length + "</td></tr>";
        html    += "  <tr><td>Total Number of Cities</td><td class='data'>" + cities.length + "</td></tr>";
        html    += "  <tr><td>Total Number of States</td><td class='data'>" + states.length + "</td></tr>";
        html    += "  <tr><td>Identified Number of Males</td><td class='data'>" + deathCount[1].values + "</td></tr>";
        html    += "  <tr><td>Identified Number of Females</td><td class='data'>" + deathCount[0].values + "</td></tr>";
        html    += "  <tr class='ageGroup'><td> Identified Age Groups:</td><td class='data'>" + "</td></tr>";
        html    += "  <tr><td>Ages Under 13 : Child</td><td class='data'>" + ageGroup[1].values + "</td></tr>";
        html    += "  <tr><td>Ages between 13 and 17 : Teen </td><td class='data'>" + ageGroup[2].values + "</td></tr>";
        html    += "  <tr><td>Ages 18 and above : Adult </td><td class='data'>" + ageGroup[3].values + "</td></tr>";
        html    += "</table>"
    
    d3.select(".infoDiv").html(html)

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