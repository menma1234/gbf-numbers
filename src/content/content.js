var area = null;
var newElems = null;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(!("hps" in request) || request.hps.length === 0) {
			return;
		}
		
		// Find the necessary DOM elements
		if(area === null) {
			area = document.getElementsByClassName("prt-targeting-area");
		}
		if(newElems === null) {
			newElems = document.getElementsByClassName("hpdisplay");
		}
		
		// Insert the new elements into the targeting area
		// The HP gauge divs are not used because during animations, they are hidden, which will end up creating a flickering effect
		if(newElems.length === 0) {
			for(var i = 0; i < request.hps.length; i++) {
				var div = document.createElement("span");
				div.setAttribute("class", "hpdisplay");
				area[0].appendChild(div);
			}
		}
		
		for(var i = 0; i < request.hps.length; i++) {
			newElems[i].innerHTML = request.hps[i];
		}
	});
