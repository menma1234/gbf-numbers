var hp = [-1, -1, -1];
var hpmax = [-1, -1, -1];

// Returns a string containing both a fraction and a percentage given the current and max HP
function getHpString(hp, hpmax) {
	var percent = Math.round(hp / hpmax * 10000) / 100;
	return hp + "/" + hpmax + " (" + percent + "%)";
}

// Resets variables and the page to blank
function reset() {
	hp = [-1, -1, -1];
	hpmax = [-1, -1, -1];
	
	for(var i = 0; i < hpmax.length; i++) {
		document.getElementById("boss" + i + "Name").innerHTML = "";
		document.getElementById("boss" + i + "HP").innerHTML = "";
	}
}

// Updates the HP shown on the page for all enemies
function updateHp() {
	for(var i = 0; i < hp.length; i++) {
		if(hp[i] === -1 && hpmax[i] === -1) {
			continue;
		}
		
		document.getElementById("boss" + i + "HP").innerHTML = getHpString(hp[i], hpmax[i]);
	}
}

// Parses the start.json response that is loaded when a battle first starts
function parseStart(content, encoding) {
	reset();
	
	var obj = JSON.parse(content);
	var enemies = obj.boss.param;
	
	for(var i = 0; i < enemies.length; i++) {
		document.getElementById("boss" + i + "Name").innerHTML = enemies[i].name + ": ";
		
		hp[i] = enemies[i].hp;
		hpmax[i] = enemies[i].hpmax;
	}
	
	updateHp();
}

// Parses the responses from abilities, summons, and attacks
function parseResponse(content, encoding) {
	var obj = JSON.parse(content);
	
	// if the response is the popup from clicking too fast
	if(!("scenario" in obj)) {
		return;
	}
	
	var log = obj.scenario;
	
	for(var i = 0; i < log.length; i++) {
		var curr = log[i];
		
		// no idea why there's randomly an empty array sometimes...
		if(!("cmd" in curr)) {
			continue;
		}
		
		if((curr.cmd === "damage" || curr.cmd === "heal") && curr.to === "boss") {
			// ability damage, extra damage (from summons (e.g. ranko) or supers (e.g. charlotte's super in break)), chain burst
			// enemy heals also use the same json format
			for(var j = 0; j < curr.list.length; j++) {
				hp[curr.list[j].pos] = curr.list[j].hp;
			}
		} else if(curr.cmd === "summon" && curr.kind.indexOf("damage") > -1) {
			// main summon damage
			var damage = curr.list[curr.list.length - 1].damage;
			
			for(var j = 0; j < damage.length; j++) {
				hp[damage[j].pos] = damage[j].hp;
			}
		} else if(curr.cmd === "attack" && curr.from === "player") {
			// regular attacks
			var damage = curr.damage;
			
			for(var j = 0; j < damage.length; j++) {
				for(var k = 0; k < damage[j].length; k++) {
					hp[damage[j][k].pos] = damage[j][k].hp;
				}
			}
		} else if(curr.cmd === "die" && curr.to === "boss") {
			// if boss dies before the attack
			hp[curr.pos] = 0;
		} else if(curr.cmd.indexOf("special") > -1 && curr.target === "boss") {
			// main super damage
			for(var j = 0; j < curr.list.length; j++) {
				var damage = curr.list[j].damage;
				for(var k = 0; k < damage.length; k++) {
					hp[damage[k].pos] = damage[k].hp;
				}
			}
		}
	}
	
	updateHp();
}

// Listen to network requests
chrome.devtools.network.onRequestFinished.addListener(
	function(request) {
		if(request.request.url.indexOf("start.json") > -1) {
			request.getContent(parseStart);
		} else if(request.request.url.indexOf("ability_result.json") > -1 || request.request.url.indexOf("summon_result.json") > -1 || request.request.url.indexOf("normal_attack_result.json") > -1) {
			request.getContent(parseResponse);
		}
	});