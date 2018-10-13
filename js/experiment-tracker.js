// Class used to track experiment
class ExperimentTracker {


	constructor() {
		// pre-experiment
		this.pid = 0;
		this.age = 0;
		this.gender = null;
		this.occupation = null;
		this.domHand = null;
		this.pcUsage = null;
		this.markingFamiliar = null;
		this.radialFamiliar = null;
		this.multiTask = null;

		// experiment
		this.trials = [];
		this.attempt = 0;
		this.trial = null;
		this.usage = null;
		this.menuType = null;
		this.menuDepth = null;
		this.targetItem = null;
		this.selectedItem = null;
		this.startTime = null;
		this.endTime = null;
		this.cursor_length = 0;
		this.last_cursor_pos = {'X':0, 'Y':0};

		// post-experiment
		this.difficulty = null;
		this.stress = null;
		this.like = null;
		this.easy = null;
		this.interest = null;
		this.attention = null;
		this.instructions = null;


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
		this.trials.push([this.pid, this.age, this.gender, this.occupation, this.domHand,
						this.pcUsage, this.markingFamiliar, this.radialFamiliar, this.multiTask,
						this.trial, this.attempt, this.usage, this.menuType, this.menuDepth,
						this.targetItem, this.selectedItem, this.startTime, this.endTime, this.cursor_length]);
		this.resetTimers();
		this.attempt++;

	}

	newTrial() {
		this.attempt = 1;
	}

	toCsv() {
		var csvFile = "PID,Age,Gender,Occupation,DominantHand,PcUsage," +
			"MarkingFamiliar,RadialFamiliar,MultiTask," +
			"Trial,Attempt,Usage,Menu Type,Menu Depth,Target Item,Selected Item,Start Time, End Time, Mouse Length" +
			"Difficulty,Stress,Like,Easy,Interest,Attention,Instructions\n";
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