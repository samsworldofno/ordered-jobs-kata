var JobList = require('../lib/job_list.js').JobList

var JobSequence = function JobSequence(input){
	this.input = input

	this.job_list = function(){
		return new JobList(input);
	}
	
	this.validate_input = function(){
		if(this.job_list().self_dependency_exists()) throw new Error("jobs cannot depend upon themselves")
	}
	
	this.output = function(){
		this.validate_input();

		var sequence = [];
		var jobs = this.job_list().jobs();
		
		for(var i = 0; i < jobs.length; i++) {
			var job = jobs[i];

			if(sequence.indexOf(job.name) == -1) sequence.push(job.name);

			if(job.dependency) {
				var dependent_position;
				
				dependent_position = sequence.indexOf(job.dependency)
				if(dependent_position > -1)	sequence.splice(dependent_position,1);

				dependent_position = sequence.indexOf(job.name);
				sequence.splice(dependent_position, 0, job.dependency);			
			}
		}

		return sequence.join('');		
	}	
}

exports.JobSequence = JobSequence;