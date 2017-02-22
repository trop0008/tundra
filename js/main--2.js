"use strict";
var gender = ""; //female or male or blank for both
var url = "http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=" + gender;
var profiles = [];
var imgurl = "";
var swipeCheck = true;
/*window.addEventListener('push', function (ev) {
    //determine the page
    let contentDiv = ev.currentTarget.document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    switch (id) {
    case "x":
        //do something for page x
        break;
    case "one":
        touchAction();
        if (profiles.length < 3) {
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
});*/




function touchAction() {
    // console.log("reinitializing touch");
    let parentTouchArea = document.getElementById('one');
    let touchArea = document.getElementById('myCard');
    let myRegion = new ZingTouch.Region(parentTouchArea);
    let myTapGesture = new ZingTouch.Swipe({
        numInputs: 1
        , maxRestTime: 200
        , escapeVelocity: 0.001
    });
  
    myRegion.bind(touchArea, myTapGesture, swipeFunction);
}

function swipeFunction(event) {
    let touchArea = document.getElementById('myCard');
    // console.log(event.detail.data[0].currentDirection);
    // console.log(event.detail.data[0].velocity);
    if (event.detail.data[0].currentDirection >= 150 && event.detail.data[0].currentDirection <= 210) {
        swipeLeft();
    }
    else if (event.detail.data[0].currentDirection >= 330 || event.detail.data[0].currentDirection <= 30) {
        // console.log("swiped right");
        touchArea.textContent = "swiped right";
    }
    // alert("swiped")
}

function getProfiles() {
    if (profiles.length == 0) {
        document.getElementById('myCard').innerHTML = "<h1 >Loading</h1>";
    }
    try {
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            imgurl = "http:" + decodeURIComponent(data.imgBaseURL);
            // console.log(data.imgBaseURL);
            // console.log(imgurl);
            profiles = profiles.concat(data.profiles);
            // console.log(profiles);
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
    }
    catch (err) {
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
}

function swipeLeft() {
    if (swipeCheck == true) {
        let profile = profiles.shift();
        swipeCheck = false;
        document.getElementById('myCard').innerHTML = "<h1 class='delete'>Profile Deleted<h1>";
        let preloadimg = new Image();
        preloadimg.src = imgurl + profiles[0].avatar;
        if (profiles.length < 3) {
            getProfiles();
        }
        setTimeout(showProfile, 1000);
       // console.log(profile);
       // console.log(profiles);
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
       p.innerHTML= profiles[0].distance;
    cardprofile.innerHTML = "";
    cardprofile.appendChild(img);
    cardprofile.appendChild(h2);
    cardprofile.appendChild(p);
    cardprofile.zIndex=1001;
    swipeCheck = true;
}
document.addEventListener("DOMContentLoaded", function () {
    //when dom is loaded...
    let contentDiv = document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    switch (id) {
    case "x":
        //do something for page x
        break;
    case "one":
        touchAction();
        if (profiles.length < 3) {
            getProfiles();
        }
        else {
            showProfile();
        }
        break;
    case "two":
        // page two
        break;
    default:
        //do the home page thing
    }
    
    
    window.addEventListener('push', function (ev) {
    //determine the page
    let contentDiv = ev.currentTarget.document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    switch (id) {
    case "x":
        //do something for page x
        break;
    case "one":
        touchAction();
        if (profiles.length < 3) {
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
});
    
    
    
    
    
})