navigator.getBattery().then(function (battery) {
	function updateAllBatteryInfo(){
		updateChargeInfo();
		updateLevelInfo();
		updateChargingInfo();
		updateDisChargingInfo();

	}

	updateAllBatteryInfo();

	battery.addEventListener('charginchange', function() {
		updateChargeInfo();
	});

	function updateChargeInfo() {
		console.log(battery.charging);
		if (battery.charging) {
			document.querySelector('#status').innerHTML = "Charging";
			document.querySelector('#battery-level').classList.add('battery-animation');
		}
		else {
			document.querySelector('#status').innerHTML = "Discharging";
			document.querySelector('#battery-level').classList.remove('battery-animation');
		}
	}

	battery.addEventListener('levelchange', updateLevelInfo);
	function updateLevelInfo () {
		//battery.level
		console.log(battery.level);
		document.querySelector('#battery-level-digit').innerHTML = battery.level * 100 + '%';
		document.querySelector('#battery-level').style.width = battery.level * 100 + '%';

	}

	battery.addEventListener('chargingtimechange', updateChargingInfo);
	
	function updateChargingInfo() {
		//battery.chargingTime
		console.log('chsrhe:'+battery.chargingTime);
		document.querySelector('#charging-time').innerHTML = battery.chargingTime;
	}

	battery.addEventListener('dischargingtimechange', updateDisChargingInfo);
	
	function updateDisChargingInfo() {
		//battery.dischargingTime
		console.log('discharge'+battery.dischargingTime);
		document.querySelector('#discharging-time').innerHTML = battery.dischargingTime;
	}
	
})





