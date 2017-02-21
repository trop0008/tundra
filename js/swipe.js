function getData(){
    //fetch the JSON data
    //then convert to json
    //then put the data into localStorage
    //then loop through the array
        //add a marker for each sighting
        //save the timestamp in the marker title
        //add a click listener for each sighting to create an infoWindow 
        //use the timestamp in the infoWindow... converted to time and date
    
 fetch("https://trop0008.edumedia.ca/mad9022/stalkr/stalkr-data.json")  
                .then(function(response){
                    return response.json(); 
                })
                .then(function(jsonData){
     //console.log(jsonData);
                    sightingList = jsonData;
                    setLocalStorage();
                    sightingList.sightings.forEach(function(location,index){
                       createMarkers(location.lat,location.lng,location.timestamp);
                        sightingCoordinates.push({lat:location.lat , lng:location.lng});
                    });
            })
     .then(function(){
    // console.log(sightingCoordinates)
                    drawPath();
                }).catch(function (err) {
                    alert("Error: " + err.message);
                });;
}


function getProfiles() {
    if (profiles.length == 0){
        document.getElementById('myCard').innerHTML = "<h1 >Loading</h1>";
    }
    try{
        fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        imgurl = "https:" + decodeURIComponent(data.imgBaseURL);
        //console.log(data.imgBaseURL);
        //console.log(imgurl);
        profiles = profiles.concat(data.profiles);
        console.log(profiles);
        showProfile();
        /*profiles.forEach(function(person){
          let img = document.createElement("img");
          let p = document.createElement("p");
          let name = "".concat(person.first, " ", person.last);
          img.src = imgurl + person.avatar;
          p.appendChild(img);
          p.innerHTML += " " + name;
          p.addEventListener('click', function(ev){
            alert('you clicked' + ev.currentTarget.textContent)
          });
          document.getElementById("mycard").appendChild(p);
        });*/
    }).catch(function (err) {
        document.getElementById('myCard').innerHTML = "<h1 >failed</h1>";
        //document.getElementById('myCard').innerHTML = err.message;
        
                    
    });
    } catch(err) {
    document.getElementById('myCard').innerHTML = err.message;
}
    
}