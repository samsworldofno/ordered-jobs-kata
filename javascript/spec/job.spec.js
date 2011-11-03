var Job = require('../lib/job.js').Job

describe("Job", function() {
	it("should extract a job's name from the input string", function(){
		var job = new Job("a =>");
		expect(job.name).toEqual('a');
	});
	
	it("should extract a job's dependency from the input string", function() {
		var job;

		job = new Job("a => b");
		expect(job.dependency).toEqual('b');
		
		job = new Job("a => ");
		expect(job.dependency).toBeNull();
	});
});