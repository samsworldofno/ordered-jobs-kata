var Job = require('../lib/job.js').Job

var JobList = function JobList(input){
	this.input = input;

	this.jobs = function(){
		var result = [];
		
		var lines = this.input.split(/\n/g);
		for(var i = 0; i < lines.length; i++){
			var job = new Job(lines[i]);
			result.push(job);
		}

		return result;
	}
	
	this.self_dependency_exists = function(){
		var jobs = this.jobs();
		
		for(var i = 0; i < jobs.length; i++){
			var job = jobs[i]
			
			if(job.name == job.dependency){
				return true;
			}
		}
		
		return false;
	}

  // def circular_dependency_exists?
  //   jobs.any? do |job|
  //     (dependents(job) & depends_upon(job)).size > 0
  //   end
  // end

	
	this.circular_dependency_exists = function(){
		var jobs = this.jobs();

		for(var i = 0; i < jobs.length; i++){
			var job = jobs[i];
			
			var depends_upon = this.depends_upon(job);
			// var dependents = this.dependents(job);
			
			// circular = dependents.some(function(el) {
				// return depends_upon.indexOf(el) > -1
			// });
			
			// if(circular) return true;
			
		}

		return false;
	}
	
	this.dependents = function(target){
		var dependents = [];
		var jobs = this.jobs();

		for(var i = 0; i < jobs.length; i++){
			var job = jobs[i];

			if(job.dependency != target.name) continue;

			dependents.push(job.name);
			
			if(dependents.indexOf(job.dependency) == -1) {
				dependents.push.apply(dependents, this.dependents(job, dependents))
			}
		}
		
		return dependents;
	}

	this.depends_upon = function(target){
		var depends_upon = [];
		var jobs = this.jobs();

		for(var i = 0; i < jobs.length; i++){
			var job = jobs[i];

			if(job.name != target.dependency) continue;

			depends_upon.push(job.name)
			
			if(depends_upon.indexOf(job.dependency) == -1){
				depends_upon.push.apply(depends_upon, this.depends_upon(job, depends_upon))
			}
		}
		
		return depends_upon;
	}
}

exports.JobList = JobList