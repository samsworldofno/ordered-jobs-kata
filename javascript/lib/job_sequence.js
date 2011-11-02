var JobList = require('../lib/job_list.js').JobList

var JobSequence = function JobSequence(input){
	this.input = input

	this.jobs_list = function(){
		return new JobList(input);
	}
	
	this.output = function(){
		var sequence = [];
		
		var jobs = this.jobs_list().jobs();
		
		for(var i = 0; i < jobs.length; i++) {
			var job = jobs[i];

			if(sequence.indexOf(job.name) == -1) {
				sequence.push(job.name);
			}

			if(job.dependency) {
				if(sequence.indexOf(job.dependency) > -1) {
					sequence.splice(sequence.indexOf(job.dependency),1);
				}

				var dependent_position = sequence.indexOf(job.name);

				sequence.splice(dependent_position, 0, job.dependency);			
			}
		}

		return sequence.join('');		
	}	
}

exports.JobSequence = JobSequence;