var $ = require('jquery'); 
var Job = require('../lib/job.js').Job

var JobList = function JobList(input) {
	this.input = input;

	this.jobs = function() {
	  var lines = this.input.split(/\n/g)
	  
		return $.map(lines, function(line) {
      return new Job(line);
		});
	}
	
	this.self_dependency_exists = function() {
    var result = false;

	  $.each(this.jobs(), function(index, job) {
			if(job.name == job.dependency) result = true;
	  });
	  
	  return result;
	}
	
	this.circular_dependency_exists = function() {
	  var result = false;
	  var list = this;
	  
	  $.each(this.jobs(), function(index, job) {
			var depends_upon = list.depends_upon(job);
			var dependents = list.dependents(job);
			
			circular = dependents.some(function(el) {
				return depends_upon.indexOf(el) > -1
			});
			
			if(circular) result = true;
	  });
	  
	  return result;
	}
	
	this.dependents = function(target, dependents) {
		var dependents = dependents || [];
		var list = this;

    $.each(this.jobs(), function(index, job) {
			if(job.dependency != target.name) return;

  		dependents.push(job.name);

  		if(dependents.indexOf(job.dependency) == -1) {
  			dependents.concat(list.dependents(job, dependents));
  		}
    });
		
		return dependents;
	}

	this.depends_upon = function(target, depends_upon) {	
		var depends_upon = depends_upon || [];
		var list = this;
		
		$.each(this.jobs(), function(index, job) {
			if(job.name != target.dependency) return;		  

			depends_upon.push(job.name);

			if(depends_upon.indexOf(job.dependency) == -1) {
				depends_upon.concat(list.depends_upon(job, depends_upon));
			} 
		});
		
		return depends_upon;
	}
}

exports.JobList = JobList;