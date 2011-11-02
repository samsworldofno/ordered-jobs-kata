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
		for(var i = 0; i < this.jobs().length; i++){
			var job = this.jobs()[i]
			
			if(job.name == job.dependency){
				return true;
			}
		}
		
		return false;
	}
	
	this.circular_dependency_exists = function(){
		for(var i = 0; i < this.jobs().length; i++){
			var job = this.jobs()[i];
			
			var depends_upon = this.depends_upon(job);
			var dependents = this.dependents(job);
			
			circular = dependents.some(function(el) {
				return depends_upon.indexOf(el) > -1
			});
			
			if(circular) return true;
		}

		return false;
	}
	
	this.dependents = function(target, dependents){
		var dependents = dependents || [];

		for(var i = 0; i < this.jobs().length; i++){
			var job = this.jobs()[i];

			if(job.dependency != target.name) continue;

			dependents.push(job.name);
			
			if(dependents.indexOf(job.dependency) == -1) {
				dependents.concat(this.dependents(job, dependents))
			}
		}
		
		return dependents;
	}

	this.depends_upon = function(target, depends_upon){	
		var depends_upon = depends_upon || [];

		for(var i = 0; i < this.jobs().length; i++){
			var job = this.jobs()[i];

			if(job.name != target.dependency) continue;
			depends_upon.push(job.name);
			
			if(depends_upon.indexOf(job.dependency) == -1){
				depends_upon.concat(this.depends_upon(job, depends_upon))
			} 
		}
		
		return depends_upon;
	}
}

exports.JobList = JobList