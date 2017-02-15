document.addEventListener("DOMContentLoaded", function(){
//when dom is loaded...
})
var globalvar="Hello";
window.addEventListener('push', function(ev){
//determine the page
let contentDiv = ev.currentTarget.document.querySelector(".content");
    
let id = contentDiv.id; //contentDiv.getAttribute("id");
switch(id){
case "x":
//do something for page x
break;
case "one":
   //     id.innerHTML=globalvar;
        globalvar= globalvar+"1";
//do something for the home page 
        alert(globalvar);
//alert("PAGE ONE STUFF");
break;
case "two":
//do something for the contacts page 
                id.innerHTML=globalvar;
        globalvar= globalvar+"2";

alert("PAGE TWO STUFF");
break;
default:
//do the home page thing
}
});