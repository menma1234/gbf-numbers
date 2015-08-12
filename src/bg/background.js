// Listen to messages from devtools and send it off to the content script
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(!("tabId" in request && "hps" in request)) {
			return;
		}
		
		chrome.tabs.sendMessage(request.tabId, {hps: request.hps});
	});
