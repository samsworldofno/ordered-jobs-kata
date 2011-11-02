var Job = function Job(input) {
	var instruction;
	
	input = input.replace(/\s*/g, '');
	instruction = input.split(/=>/);

	this.name = instruction[0];
	this.dependency = instruction[1] ? instruction[1] : null;	
}

exports.Job = Job;