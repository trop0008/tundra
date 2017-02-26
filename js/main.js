/*****************************************************************
File: main.js
Author: Marjan Tropper
Description:

    The Tundra app.
    •	A fetch call is made to php file returning list of 6 random profiles.
    •	The array of profiles returned is saved in global variable 
    •	ONE profile is displayed at a time on the main page showing  first name, last name, distance and an avatar image.
    •	Swipe to LEFT to DELETEs profiles from global variable and interface
    •	Swipe to RIGHT saves the profile to the local storage and removes them from the global variable. 
        Saved profiles are shown in list view on the Saved profiles page. 
        Deleting a profile from the saved list removed it from the localstorage
    •	Every time a profile is deleted or saved the user gets a prompt letting them know what happened
    •	Ratchet CSS framework is used for styling (http://goratchet.com/components)
    •	Zing touch has been used to add swipe functionality (https://zingchart.github.io/zingtouch)



Version: 0.1.1
Updated: Feb 26, 2017
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
let savedListProfiles = {
    url:"",
    savedProfiles: []
};
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
           /* without the http: is front of the image url it would randomly not show images so http: was added to the url string to solve the bug*/
            savedListProfiles.url=imgurl;
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
                savedListProfiles.url=imgurl;
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
        profiles = profiles.concat(data.profiles);
        imgurl = "http:" + decodeURIComponent(data.imgBaseURL);
        savedListProfiles.url=imgurl;
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
/* the following seems redundent but ipad did not recognize fetch so this was added to fix the issue with Ipad I think it has something to do with Rachet since normally Fetch works fine on chrome on an ipad*/
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
    let parentTouchArea = document.getElementById('one');
    let touchArea = document.getElementById('myCard');
    let myRegion = new ZingTouch.Region(parentTouchArea);
    let myTapGesture = new ZingTouch.Pan({
        threshold: 30
    });
    myRegion.bind(touchArea, myTapGesture, swipeFunction);

    function swipeFunction(event) {
        event.preventDefault();
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
        let profile = profiles.shift();
        savedListProfiles.savedProfiles.push(profile);
        setLocalStorage();
        swipeCheck = false;
        document.getElementById('myCard').classList.add("activeSwipe");
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
    if (swipeCheck) {
        let profile = profiles.shift();
        swipeCheck = false;
        document.getElementById('myCard').classList.add("activeSwipe");
        
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
function setLocalStorage() {
    if (localStorage) {
        
        localStorage.setItem("trop0008", JSON.stringify(savedListProfiles));
    }
}

function getLocalStorage() {
    if (!localStorage.getItem("trop0008")) {
        // get the json data
        document.getElementById('saved').innerHTML = "<h3 class='delete' >You have not saved any profiles.</h3>";
    }
    else {
        savedListProfiles = JSON.parse(localStorage.getItem('trop0008'));
        if (savedListProfiles == null || savedListProfiles == "{}") {
            document.getElementById('saved').innerHTML = "<h3 class='delete' >You have not saved any profiles.</h3>";
        }
        else {
            savedListProfiles = JSON.parse(localStorage.getItem('trop0008'));
            if (savedListProfiles.savedProfiles != null) {
                if (savedListProfiles.savedProfiles.length == 0) {
                    document.getElementById('saved').innerHTML = "<h3 class='delete' >You have not saved any profiles.</h3>";
                }
                else {
                    if (imgurl == ""){
                        imgurl= savedListProfiles.url;
                    }
                    let profileList = document.getElementById('saved');
                    profileList.innerHTML = "";
                    let ul = document.createElement("ul");
                    ul.className = "table-view";
                    savedListProfiles.savedProfiles.forEach(function (savedProfile, index) {
                        // the saved list items are created here
                        let li = document.createElement("li");
                        li.className = "table-view-cell " + savedProfile.gender;
                        let span = document.createElement("span");
                        span.className = "media-object pull-right icon icon-trash";
                        let img = document.createElement("img");
                        img.className = "media-object  pull-left";
                        img.src = imgurl + savedProfile.avatar;
                        let div = document.createElement("div");
                        div.className = "media-body ";
                        let name = "".concat(savedProfile.first, " ", savedProfile.last);
                        div.innerHTML += " " + name;
                        let p = document.createElement("p");
                        p.innerHTML = "Distance: " +  savedProfile.distance;
                        div.appendChild(p);
                        li.appendChild(span);
                        li.appendChild(img);
                        li.appendChild(div);
                        ul.appendChild(li);
                        span.addEventListener("click", deleteProfile)

                        function deleteProfile(ev) {
                            ev.preventDefault;
                            if (index > -1) {
                                savedListProfiles.savedProfiles.splice(index, 1);
                                localStorage.setItem("trop0008", JSON.stringify(savedListProfiles));
                                if (savedListProfiles.savedProfiles.length == 0) {
                                    document.getElementById('saved').innerHTML = "<h3 class='delete' >You have not saved any profiles.</h3>";
                                }
                            }
                            ev.target.removeEventListener("click", deleteProfile);
                            li.parentElement.removeChild(li);
                            getLocalStorage();
                        }
                    });
                    profileList.appendChild(ul);
                }
            }
            else {
                document.getElementById('saved').innerHTML = "<h3 class='delete' >You have not saved any profiles.</h3>";
            }
        }
    }
}
/************* page load events *****************/
function init(ev) {
    //determine the page
    let contentDiv = document.querySelector(".content");
    let id = contentDiv.id;
    switch (id) {
    case "one":
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
        getLocalStorage();
        break;
    default:
        //do the home page thing
    }
}
/**************************** Initialising ********************************/
window.addEventListener('push', init);
document.addEventListener("DOMContentLoaded", init);