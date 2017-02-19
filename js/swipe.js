    var containerElement = document.getElementById('one');
var activeRegion = ZingTouch.Region(containerElement);
    var childElement = document.getElementById('myCard');
activeRegion.bind(childElement, 'swipe', function(event){
	//Perform Operations
    
    alert("swiped")
});
    