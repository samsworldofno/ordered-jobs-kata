var JobSequence = require('../lib/job_sequence').JobSequence;

describe("JobSequence", function(){
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
		expect(result.indexOf('c')).toBeLessThan(result.indexOf('b'))
	});
});