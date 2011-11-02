var JobList = require('../lib/job_list.js').JobList

describe("JobList", function() {
  it("should return a list of jobs from an input string", function() {
    var list = new JobList("a => ");
		
		expect(list.jobs().length).toEqual(1);
  });

	it("should know when a job depends upon itself", function(){
	  var input = '	a => \n\
                  b => \n\
                  c => c';
	  var list = new JobList(input);
	
		expect(list.self_dependency_exists()).toBeTruthy();
	});
	
	it("should know when a circular dependency exists", function() {
	  var input = ' a =>   \n\
                  b => c \n\
                  c => f \n\
                  d => a \n\
                  e =>   \n\
                  f => b'
	  var list = new JobList(input);

		expect(list.circular_dependency_exists()).toBeTruthy();
	});
});