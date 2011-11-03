var JobList = require('../lib/job_list.js').JobList

describe("JobList", function() {
	it("should return a list of jobs from an input string", function() {
		var list = new JobList("a => ");
		
		expect(list.jobs().length).toEqual(1);
	});

	it("should know when a job depends upon itself", function() {
		var input = ' a => \n\
									b => \n\
									c => c';
		var list = new JobList(input);
	
		expect(list.self_dependency_exists()).toBeTruthy();
	});
	
	it("should know when a circular dependency exists", function() {
		var input = ' a =>	 \n\
									b => c \n\
									c => f \n\
									d => a \n\
									e =>	 \n\
									f => b';
		var list = new JobList(input);

		expect(list.circular_dependency_exists()).toBeTruthy();
	});
	
	describe("dependents", function() {
		it("should know which other jobs depend upon a given job", function() {
			var input = ' a =>	\n\
										b => c\n\
										c => ';
			var list = new JobList(input);
			var target = list.jobs()[2] // hacky way of getting the 'c' Job object :(

			expect(list.dependents(target)).toEqual(['b']);
		});
		
		it("should know recognise multi-level dependencies", function() {
			var input = ' a => b \n\
										b => c\n\
										c => ';
			var list = new JobList(input);
			var target = list.jobs()[2]; // hack hack hack

			expect(list.dependents(target)).toEqual(['b', 'a']);
		});
	});
	
	describe("depends upon", function() {
		xit("should know which jobs this job depends upon", function() {
			var input = ' a =>	\n\
										b => c\n\
										c => ';
			var list = new JobList(input);
			var target = list.jobs()[1];

			expect(list.depends_upon(target)).toEqual(['c']);
		});

		it("should know which jobs this job depends upon including multi-level dependencies", function() {
			var input = ' a =>	\n\
										b => c\n\
										c => a';
			var list = new JobList(input);
			var target = list.jobs()[1];

			expect(list.depends_upon(target)).toEqual(['c', 'a']);
		});
	
		it("should include circular dependencies", function() {
			var input = ' a => b\n\
										b => a';
	
			var list = new JobList(input);
			var target = list.jobs()[1];
			
			expect(list.depends_upon(target)).toEqual(['a', 'b']);
		});
	});
});