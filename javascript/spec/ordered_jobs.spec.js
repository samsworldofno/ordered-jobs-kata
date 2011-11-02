function Job(input){
	var instruction;
	
	input = input.replace(/\s*/g, '');
	instruction = input.split(/=>/);

	this.name = instruction[0];
	this.dependency = instruction[1] ? instruction[1] : null;	
}

function JobList(input){
	this.input = input;
	
	this.jobs = function(){
		var result = [];
		
		var lines = this.input.split(/\n/g);
		for(var i = 0; i < lines.length; i++) {
			var job = new Job(lines[i]);
			result.push(job)
		}

		return result;
	}
	
	this.sequence = function(){
		var sequence = [];
		
		for(var i = 0; i < this.jobs().length; i++) {
			var job = this.jobs()[i];

			if(sequence.indexOf(job.name) == -1) {
				sequence.push(job.name);
			}

			if(job.dependency) {
				if(sequence.indexOf(job.dependency) > -1) {
					sequence.splice(sequence.indexOf(job.dependency),1);
				}

				var dependent_position = sequence.indexOf(job.name);

				sequence.splice(dependent_position, 0, job.dependency);			
			}
		}

		return sequence.join('');		
	}
}

describe("Job", function(){
	it("should extract a job's name from the input string", function() {
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

describe("JobList", function() {
  it("should return a list of jobs from an input string", function() {
    var list = new JobList("a => ");
		
		expect(list.jobs().length).toEqual(1);
  });

	describe("sequence", function(){
		beforeEach(function(){	
		  this.addMatchers({

		    toContainAllOf: function(expected) {
					for(var i = 0; i < expected.length; i++) {
						if(this.actual.indexOf(expected[i]) < 0){
							return false;
						}
					}
					return true;
		    }

		  });
		});

		it("should return a blank string when a blank string is entered", function(){
			var input = '';
			var list = new JobList(input)

			expect(list.sequence()).toEqual('');
	  });

		it("should return a single job when that single job is passed", function(){
			var input = ' a => ';
			var list = new JobList(input);

			expect(list.sequence()).toEqual('a');
		})

		it("should return a multiple jobs in non-significant order when there are no dependencies", function(){
			var input = '	a => \n\
	                  b => \n\
	                  c => ';
			var list = new JobList(input);

			expect(list.sequence()).toContainAllOf(['a', 'b', 'c']);
		})

		it("should return multiple jobs in a significant order when dependencies exist", function() {
		  var input = '	a => \n\
	                  b => c \n\
	                  c =>';
			var list = new JobList(input);

	  	result = list.sequence();

			expect(result).toContainAllOf(['a', 'b', 'c'])
			expect(result.indexOf('c')).toBeLessThan(result.indexOf('b'))
		});
	});
});

