// Class used to track experiment
class ExperimentTracker {


	constructor() {

		this.trials = [];
		this.attempt = 0;
		this.trial = null;
		this.attempt = null;
		this.menuType = null;
		this.menuDepth = null;
		this.targetItem = null;
		this.selectedItem = null;
		this.startTime = null;
		this.endTime = null;
		this.cursor_length = 0;
		this.last_cursor_pos = {'X':0, 'Y':0};
	}
	
	resetTimers(){
		this.startTime = null;
		this.endTime = null;
		this.cursor_length = 0;
	}

	startTimer() {
		this.startTime = Date.now();
	}

	measureDist(event) {

		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", this.cursor_length)
		this.cursor_length += Math.round(Math.sqrt(Math.pow(this.last_cursor_pos.Y - event.clientY, 2) +
			Math.pow(this.last_cursor_pos['X'] - event.clientX, 2)));

		this.last_cursor_pos['X'] = event.clientX;
		this.last_cursor_pos['Y'] = event.clientY;
	}



	recordSelectedItem(selectedItem) {
		this.selectedItem = selectedItem;
		this.stopTimer();
	}

	stopTimer() {
		
		this.endTime = Date.now();
		this.trials.push([this.trial, this.attempt, this.menuType, this.menuDepth, this.targetItem, this.selectedItem, this.startTime, this.endTime, this.cursor_length])
		this.resetTimers();
		this.attempt++;

	}

	newTrial() {
		this.attempt = 1;
	}

	toCsv() {
		var csvFile = "Trial,Attempt,Menu Type,Menu Depth,Target Item,Selected Item,Start Time, End Time, Mouse Length\n";
		for (var i = 0; i < this.trials.length; i++) {
			csvFile += this.trials[i].join(',');
			csvFile += "\n";
		}

		var hiddenLink = document.createElement('a');
		hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
		hiddenLink.target = '_blank';
		hiddenLink.download = 'experiment.csv';
		document.body.appendChild(hiddenLink);
		hiddenLink.click();
	}


}