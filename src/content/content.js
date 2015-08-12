var origDivs = null;
var newElems = null;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(!("hps" in request)) {
			return;
		}
		
		// Find the necessary DOM elements
		if(origDivs === null) {
			origDivs = document.getElementsByClassName("btn-enemy-gauge");
		}
		if(newElems === null) {
			newElems = document.getElementsByClassName("hpdisplay");
		}
		
		// Insert the new elements after the original ones if they haven't already been
		// The original ones are not used because during animations, they are hidden, which will end up creating a flickering effect
		if(newElems.length === 0) {
			for(var i = 0; i < origDivs.length; i++) {
				var div = document.createElement("span");
				div.setAttribute("class", "hpdisplay");
				origDivs[i].parentNode.insertBefore(div, origDivs[i].nextSibling);
			}
		}
		
		for(var i = 0; i < request.hps.length; i++) {
			newElems[i].innerHTML = request.hps[i];
		}
	});
