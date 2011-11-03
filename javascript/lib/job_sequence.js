var JobList = require('../lib/job_list.js').JobList

var JobSequence = function JobSequence(input) {
	this.input = input;
	this.sequence = [];

	this.job_list = function() {
		return new JobList(input);
	}
	
	this.validate_input = function() {
		if(this.job_list().self_dependency_exists()) throw new Error("jobs cannot depend upon themselves");
		if(this.job_list().circular_dependency_exists()) throw new Error("input string cannot create a circular dependency");
	}
	
	this.output = function() {
		this.validate_input();
		this.calculate();
		
		return this.sequence.join();
	} 
	
	this.delete = function(job) {
		var dependent_position = this.sequence.indexOf(job);
		if(dependent_position > -1) this.sequence.splice(dependent_position,1);
	}
	
	this.add = function(name) {
	  this.sequence.push(name);
	}
	
	this.add_before = function(name, dependency) {
		var dependent_position = this.sequence.indexOf(name);
		this.sequence.splice(dependent_position, 0, dependency);				  
	}
	
	this.calculate = function() {
		var jobs = this.job_list().jobs();
		
		for(var i = 0; i < jobs.length; i++) {
			var job = jobs[i];
			
			this.add(job.name);

			if(job.dependency) {
		    this.delete(job.dependency);		    
		    this.add_before(job.name, job.dependency)
			}
		}
	}
}

exports.JobSequence = JobSequence;