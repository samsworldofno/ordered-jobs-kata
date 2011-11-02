var JobList = require('../lib/job_list.js').JobList

describe("JobList", function() {
  it("should return a list of jobs from an input string", function() {
    var list = new JobList("a => ");
		
		expect(list.jobs().length).toEqual(1);
  });
});