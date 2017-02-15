document.addEventListener("DOMContentLoaded", function(){
//when dom is loaded...
})

window.addEventListener('push', function(ev){
//determine the page
let contentDiv = ev.currentTarget.document.querySelector(".content");
let id = contentDiv.id; //contentDiv.getAttribute("id");
switch(id){
case "x":
//do something for page x
break;
case "one":
//do something for the home page 
alert("PAGE ONE STUFF");
break;
case "two":
//do something for the contacts page 
alert("PAGE TWO STUFF");
break;
default:
//do the home page thing
}
});