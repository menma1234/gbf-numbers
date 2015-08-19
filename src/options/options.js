var initDone = false;

// Loads options from storage and populates the page
function restoreOptions() {
	chrome.storage.sync.get( {
		thousands: true
		}, function(items) {
			document.getElementById("thousands").checked = items.thousands;
		});
}

// Adds change handlers to the elements on the page
function addChangeHandlers() {
	if(initDone) {
		return;
	}
	
	document.getElementById("thousands").addEventListener("change", function() {
			chrome.storage.sync.set( {
				thousands: document.getElementById("thousands").checked
				}, function() {
					// Notify background page that the setting was changed
					chrome.runtime.sendMessage({
						thousands: document.getElementById("thousands").checked
					});
				} );
		});
	
	initDone = true;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.addEventListener("DOMContentLoaded", addChangeHandlers);
