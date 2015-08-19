var conns = [];

// Listen to messages from options and send it to devtools
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(!("thousands" in request)) {
			return;
		}
		
		for(var i = 0; i < conns.length; i++) {
			conns[i].postMessage(request);
		}
	});

// Listen to devtools connections and keep track of all open connections
chrome.runtime.onConnect.addListener(
	function(port) {
		if(port.name === "devtools") {
			conns.push(port);
			
			// Load settings and send to devtools
			// https://code.google.com/p/chromium/issues/detail?id=178618
			chrome.storage.sync.get( {
					thousands: true
				}, function(items) {
					port.postMessage(items);
				});
			
			// Listen to messages from devtools and send it off to the content script
			port.onMessage.addListener(
				function(request) {
					if(!("tabId" in request && "hps" in request)) {
						return;
					}
					
					chrome.tabs.sendMessage(request.tabId, {hps: request.hps});
				});
			
			// Remove when devtools closes
			port.onDisconnect.addListener(
				function(port) {
					conns.splice(conns.indexOf(port), 1);
				});
		}
	});
