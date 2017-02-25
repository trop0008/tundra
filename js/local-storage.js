
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
