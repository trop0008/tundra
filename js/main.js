/*****************************************************************
File: main.js
Author: Marjan Tropper
Description:


Version: 0.1.1
Updated: Feb 24, 2017

*****************************************************************/
//Declarations

"use strict";
let firstLoad = true;

let profiles = [];
//let savedProfiles = [];
let imgurl = "";
let swipeCheck = false;
let gender = ""; //female or male or blank for both
let url = "http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=" + gender;
let savedListProfiles={savedProfiles:[]};

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
    
        if (swipeCheck) {
        console.log("swipeCheck true");
        let profile = profiles.shift();
            console.log(profile);

            savedListProfiles.savedProfiles.push(profile);
            setLocalStorage();
            console.log(savedListProfiles);
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
    if (swipeCheck ) {
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


/**************************** local storage functions ********************************/
 
function setLocalStorage(){
    if(localStorage){
                        localStorage.setItem("trop0008", JSON.stringify(savedListProfiles));
                    } 
    
    
}

function getLocalStorage(){
    if (!localStorage.getItem("trop0008")) {
        // get the json data
         document.getElementById('saved').innerHTML ="<h3 class='delete' >You have not any saved profiles.</h3>" ;


    } else {




        savedListProfiles = JSON.parse(localStorage.getItem('trop0008'));


        if (savedListProfiles == null || savedListProfiles == "{}") {

             document.getElementById('saved').innerHTML ="<h3 class='delete' >You have not any saved profiles.</h3>" ;
        } else {

           if (savedListProfiles.savedProfiles!=null){
               let profileList = document.getElementById('saved');
               profileList.innerHTML= "Hello";
            
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
                   
                   
                    });*/
           } else {
               
                 document.getElementById('saved').innerHTML ="<h3 class='delete' >You have not any saved profiles.</h3>" ;
           }

            
        }


}
}






/************* page load events *****************/
function init(ev) {
    //determine the page
    let contentDiv = document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    
    switch (id) {
    case "one":
            console.log("loading");
            console.log(profiles);
        if (profiles.length == 0) {
            
            document.getElementById('myCard').innerHTML = "<h1 class='saved'>Loading....</h1>";
            
            getProfiles();
        }
        else if (profiles.length < 3) {
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
            getLocalStorage();
        break;
    default:
        //do the home page thing
    }
}

/**************************** Initialising ********************************/
window.addEventListener('push', init);
document.addEventListener("DOMContentLoaded", init);