var Job = require('../lib/job.js').Job

var JobList = function JobList(input){
	this.input = input;
	
	this.jobs = function(){
		var result = [];
		
		var lines = this.input.split(/\n/g);
		for(var i = 0; i < lines.length; i++) {
			var job = new Job(lines[i]);
			result.push(job)
		}

		return result;
	}
}

exports.JobList = JobList