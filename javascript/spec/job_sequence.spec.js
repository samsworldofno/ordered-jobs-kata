var JobSequence = require('../lib/job_sequence').JobSequence;

describe("JobSequence", function(){
	beforeEach(function(){	
	  this.addMatchers({

	    toContainAllOf: function(expected){
				for(var i = 0; i < expected.length; i++) {
					if(this.actual.indexOf(expected[i]) < 0){
						return false;
					}
				}
				return true;
	    },
	
			toHaveJobsInThisOrder: function(a, b){
				return this.actual.indexOf(a) < this.actual.indexOf(b)
			}

	  });
	});

	it("should return a blank string when a blank string is entered", function(){
		var input = '';
		var sequence = new JobSequence(input);

		expect(sequence.output()).toEqual('');
  });

	it("should return a single job when that single job is passed", function(){
		var input = ' a => ';
		var sequence = new JobSequence(input)

		expect(sequence.output()).toEqual('a');
	})

	it("should return a multiple jobs in non-significant order when there are no dependencies", function(){
		var input = '	a => \n\
                  b => \n\
                  c => ';
		var sequence = new JobSequence(input);

		expect(sequence.output()).toContainAllOf(['a', 'b', 'c']);
	})

	it("should return multiple jobs in a significant order when dependencies exist", function() {
	  var input = '	a => \n\
                  b => c \n\
                  c =>';
		var sequence = new JobSequence(input);

  	result = sequence.output();

		expect(result).toContainAllOf(['a', 'b', 'c'])
		expect(result).toHaveJobsInThisOrder('c', 'b')
		
	});
	
	it("should return multiple jobs in a significant order when multiple dependencies exist", function() {
		var input = ' a => \n\
                  b => c \n\
                  c => f \n\
                  d => a \n\
                  e => b \n\
                  f =>'

		var sequence = new JobSequence(input);

  	result = sequence.output();

		expect(result).toContainAllOf(['a', 'b', 'c', 'd', 'e', 'f'])
		
		expect(result).toHaveJobsInThisOrder('f', 'c')
		expect(result).toHaveJobsInThisOrder('c', 'b')
		expect(result).toHaveJobsInThisOrder('b', 'e')	  
		expect(result).toHaveJobsInThisOrder('a', 'd')	  	
	});
	
	it("should raise an error if a job depends on itself", function() {
	  var input = '	a => \n\
                  b => \n\
                  c => c';	  

    var sequence = new JobSequence(input);

		expect(function(){ sequence.output() }).toThrow('jobs cannot depend upon themselves');
	});
});