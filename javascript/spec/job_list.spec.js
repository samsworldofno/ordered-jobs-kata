var JobList = require('../lib/job_list.js').JobList

describe("JobList", function() {
  it("should return a list of jobs from an input string", function() {
    var list = new JobList("a => ");
		
		expect(list.jobs().length).toEqual(1);
  });

	it("should know when a circular dependency exists", function(){
	  var input = '	a => \n\
                  b => \n\
                  c => c';

	  var list = new JobList(input);
	
		expect(list.self_dependency_exists()).toBeTruthy();
	});
});