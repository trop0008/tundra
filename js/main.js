/******************* setting global variables  **************************************/
"use strict";
let profiles = [];
let savedProfiles = [];
let imgurl = "";
let swipeCheck = false;
let gender = ""; //female or male or blank for both
let url = "http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=" + gender;
/******************* fetching json file  **************************************/
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
            return response.json();
        }).then(function (jsonData) {
            imgurl = "http:" + decodeURIComponent(jsonData.imgBaseURL);
            profiles = profiles.concat(jsonData.profiles);
            if (profiles.length < 7) {
                showProfile();
            }
            return jsonData;
        }).catch(function (err) {
            console.log("Error: " + err.message);
            
            function reqListener() {
                var data = JSON.parse(this.responseText);
               
                profiles = profiles.concat(data.profiles);
                imgurl = "http:" + decodeURIComponent(data.imgBaseURL);
                if (profiles.length < 7) {
                    showProfile();
                }
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

function jsonError() {
    
    function reqListener() {
        var data = JSON.parse(this.responseText);
        // console.log(data);
        profiles = profiles.concat(data.profiles);
        imgurl = "http:" + decodeURIComponent(data.imgBaseURL);
        if (profiles.length < 7) {
            showProfile();
        }
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
// this seems redundent but ipad did not recognize fetch so this was added to fix the issue with Ipad
function getProfiles() {
    try {
        serverData.getJSON();
    }
    catch (err) {
        jsonError();
    }
}
/*********************** swipe functions ********************/
function touchAction() {
    console.log("making touch");
    let parentTouchArea = document.getElementById('one');
    let touchArea = document.getElementById('myCard');
    let myRegion = new ZingTouch.Region(parentTouchArea);
    
    let myTapGesture = new ZingTouch.Pan({
        threshold: 30
    });
    myRegion.bind(touchArea, myTapGesture, swipeFunction);
    
    function swipeFunction(event) {
        event.preventDefault();
        console.log("swiped");
        let touchArea = document.getElementById('myCard');
        if (event.detail.data[0].currentDirection >= 150 && event.detail.data[0].currentDirection <= 210) {
            myRegion.unbind(touchArea);
            swipeLeft();
        }
        else if (event.detail.data[0].currentDirection >= 330 || event.detail.data[0].currentDirection <= 30) {
            
            
            myRegion.unbind(touchArea);
            swipeRight();
        }
        
    }
}

function swipeRight() {
    
        if (swipeCheck == true) {
        console.log("swipeCheck true");
        let profile = profiles.shift();
            console.log(profile);
            savedProfiles = savedProfiles.concat(profile);
            console.log(savedProfiles);
        swipeCheck = false;
        document.getElementById('myCard').classList.add("activeSwipe") ;
        //document.getElementById('myCard').className = "card table-view";
        document.getElementById('myCard').innerHTML = "<h1 class='saved'>Saved Profile</h1>";
        let preloadimg = new Image();
        preloadimg.src = imgurl + profiles[0].avatar;
        if (profiles.length < 3) {
           
            getProfiles();
        }
        setTimeout(showProfile, 1000);
    }
}

function swipeLeft() {
    if (swipeCheck == true) {
        console.log("swipeCheck true");
        let profile = profiles.shift();
        swipeCheck = false;
        document.getElementById('myCard').classList.add("activeSwipe") ;
        //document.getElementById('myCard').className = "card table-view";
        document.getElementById('myCard').innerHTML = "<h1 class='delete'>Deleted Profile</h1>";
        let preloadimg = new Image();
        preloadimg.src = imgurl + profiles[0].avatar;
        if (profiles.length < 3) {
           
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
    touchAction();
}
/************* page load events *****************/
function init(ev) {
    //determine the page
    let contentDiv = document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    
    switch (id) {
    case "one":
        if (profiles.length == 0) {
            
            document.getElementById('myCard').innerHTML = "<h1 class='saved'>Loading....</h1>";
            
            getProfiles();
        }
        else if (profiles.length < 4) {
            getProfiles();
        }
        else {
            showProfile();
        }
        touchAction();
        break;
    case "two":
        //do something for the contacts page 
        console.log("page 2");
        break;
    default:
        //do the home page thing
    }
}
/**************************** Initialising ********************************/
window.addEventListener('push', init);
document.addEventListener("DOMContentLoaded", init);