
let savedListProfiles={savedProfiles:[]};
function setLocalStorage(){
    if(localStorage){
                        localStorage.setItem("trop0008", JSON.stringify(savedListProfiles));
                    } 
    
    
}

function getLocalStorage(){
    if (!localStorage.getItem("trop0008")) {
        // get the json data
         document.getElementById('two').innerHTML ="<p>You have have not saved any profiles.</p>"


    } else {




        savedListProfiles = JSON.parse(localStorage.getItem('trop0008'));


        if (savedListProfiles == null || savedListProfiles == "{}") {

             document.getElementById('two').innerHTML ="<div class='content-padded'><p>You have have not saved any profiles.</p></div>"
        } else {

           if (savedListProfiles.savedProfiles!=null){
            
               savedListProfiles.savedProfiles.forEach(function(locations,index){
                   // the saved list items are created here
                   
                    });
           } else {
               
                document.getElementById('two').innerHTML ="<p>You have have not saved any profiles.</p>"
           }

            
        }


}
}






function createMarkers(MLat,MLng,MTime){
        let content = "Latitude:" + MLat + "<br>Logitude:"+ MLng + "<br>Date and time of Sighting:<br>" + convertTime(MTime); 
      
       
        let newMarker = new google.maps.Marker({
          position:  {lat:MLat , lng:MLng},
         icon: {
    path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
    fillColor: 'gold',
    fillOpacity: 1,
   
    strokeColor: 'gold',
    strokeWeight: 1
  },
            label:String(markerCounter++),
           title:'Click icon to view sighthing details.' ,
          map: map
        });
        let infowindow = new google.maps.InfoWindow({
        content: content
  });
        
        newMarker.addListener('click', function() {
    infowindow.open(map, newMarker);
  });
  
}



               /*savedListProfiles.savedProfiles.forEach(function(locations,index){
                   // the saved list items are created here
                   
                   let cardprofile = document.getElementById('myCard');
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let name = "".concat(profiles[0].first, " ", profiles[0].last);
    img.src = imgurl + profiles[0].avatar;
    h2.innerHTML += " " + name;
    let p = document.createElement("p");
    p.innerHTML = "Distance: " + profiles[0].distance;
    cardprofile.innerHTML = "";
    cardprofile.appendChild(img);
    cardprofile.appendChild(h2);
    cardprofile.appendChild(p);
    cardprofile.className = "card table-view " + profiles[0].gender;
           
           
           
           
            <ul class="table-view">
  <li class="table-view-cell ">
    <span class="media-object pull-right icon icon-trash"></span>
      <img class="media-object  pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 1
        
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    
          </li></ul>
          
          
            <!-- <ul class="table-view">
  <li class="table-view-cell ">
    <span class="media-object pull-right icon icon-trash"></span>
      <img class="media-object  pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 1
        
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    
          </li></ul>-->
                   
                   
                    });*/
