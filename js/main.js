"use strict";
let profiles = [];
let imgurl = "";
let swipeCheck = true;
let gender= ""; //female or male or blank for both
let  url = "http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=" + gender;

let serverData = {
    
   
     httpRequest: "GET"
    , getJSON: function () {
        // Add headers and options objects
        // Create an empty Request Headers instance
        let headers = new Headers();
        // Add a header(s)
        // key value pairs sent to the server
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        let options = {
            method: serverData.httpRequest
            , mode: "cors"
            , headers: headers
        };

        let request = new Request(url, options);
        fetch(request).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (jsonData) {
            imgurl = "http:" + decodeURIComponent(jsonData.imgBaseURL);
            profiles = profiles.concat(jsonData.profiles);
            
                showProfile();
            
            return jsonData;
        }).catch(function (err) {
            console.log("Error: " + err.message);
            swipeCheck = true;

            function reqListener() {
                var data = JSON.parse(this.responseText);
                // console.log(data);
                profiles = profiles.concat(data.profiles);
                imgurl = "http:" + decodeURIComponent(data.imgBaseURL);
                showProfile();
            }

            function reqError(err) {
                document.getElementById('myCard').innerHTML = 'Fetch Error :-S', err;
            }
            var oReq = new XMLHttpRequest();
            oReq.onload = reqListener;
            oReq.onerror = reqError;
            oReq.open('get', url, true);
            oReq.send();
        });
    }
};






function jsonError(){
    //document.getElementById('myCard').innerHTML = err.message;
    swipeCheck = true;

    function reqListener() {
        var data = JSON.parse(this.responseText);
        // console.log(data);
        profiles = profiles.concat(data.profiles);
        imgurl = "http:" + decodeURIComponent(data.imgBaseURL);
        showProfile();
    }

    function reqError(err) {
        document.getElementById('myCard').innerHTML = 'Fetch Error :-S', err;
    }
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('get', url, true);
    oReq.send();
}


function getProfiles(){
    try {
        serverData.getJSON();
    }
    catch (err) {
        jsonError();
    }
}









/*********************** swipe functions ********************/
function touchAction() {
    let parentTouchArea = document.getElementById('one');
    let touchArea = document.getElementById('myCard');
    let myRegion = new ZingTouch.Region(parentTouchArea);
    let myTapGesture = new ZingTouch.Swipe({
        numInputs: 1
        , maxRestTime: 100
        , escapeVelocity: 0.001
    });
  
    myRegion.bind(touchArea, myTapGesture, swipeFunction);
}

function swipeFunction(event) {
    let touchArea = document.getElementById('myCard');
    
    if (event.detail.data[0].currentDirection >= 150 && event.detail.data[0].currentDirection <= 210) {
        swipeLeft();
    }
    else if (event.detail.data[0].currentDirection >= 330 || event.detail.data[0].currentDirection <= 30) {
         touchArea.className = "card table-view" ;
        touchArea.textContent = "swiped right";
    }
    // alert("swiped")
}

function swipeLeft() {
    if (swipeCheck == true) {
        let profile = profiles.shift();
        swipeCheck = false;
        document.getElementById('myCard').className = "card table-view" ;
        document.getElementById('myCard').innerHTML = "<h1 class='delete'><br/>Profile<br/> Deleted<h1>";
        let preloadimg = new Image();
        preloadimg.src = imgurl + profiles[0].avatar;
        if (profiles.length < 3) {
            // serverData.getJSON();
            getProfiles();
        }
        setTimeout(showProfile, 1000);
       
    }
}
function showProfile() {
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
    swipeCheck = true;
}
/************* page load events *****************/
function pageSelector(ev) {
    //determine the page
    let contentDiv = ev.currentTarget.document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    switch (id) {
    case "one":
        touchAction();
        if (profiles.length == 0) {
            //document.getElementById('myCard').innerHTML = "<h1 >Loading</h1>";
            // serverData.getJSON();
            getProfiles();
        }
        else if (profiles.length < 3) {
            // serverData.getJSON();
            getProfiles();
        }
        else {
            showProfile();
        }
        break;
    case "two":
        //do something for the contacts page 
        break;
    default:
        //do the home page thing
    }
}
/**************************** Initialising ********************************/
function init(ev) {
    let contentDiv = document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    switch (id) {
    case "one":
        touchAction();
        if (profiles.length == 0) {
         //   document.getElementById('myCard').innerHTML = "<h1 >Loading</h1>";
           // serverData.getJSON();
            getProfiles();
        }
        else if (profiles.length < 3) {
           // serverData.getJSON();
            getProfiles();
        }
        else {
            showProfile();
        }
        break;
    case "two":
        //do something for the contacts page 
        break;
    default:
        //do the home page thing
    }
    
}
window.addEventListener('push', pageSelector);
document.addEventListener("DOMContentLoaded", init);