"use strict";
var gender = ""; //female or male or blank for both
var url = "http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=" + gender;
var profiles = [];
var imgurl = "";
var swipeCheck = false;
var touchArea = document.getElementById('myCard');
/************* page load events *****************/
function pageSelector(ev) {
    //determine the page
    let contentDiv = ev.currentTarget.document.querySelector(".content");
    let id = contentDiv.id; //contentDiv.getAttribute("id");
    switch (id) {
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
}
/**************************** Initialising ********************************/
function init(ev) {
    pageSelector(ev);
    window.addEventListener('push', pageSelector);
}
document.addEventListener("DOMContentLoaded", init);