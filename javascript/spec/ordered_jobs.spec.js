function job_sequence(input) {
	console.log(input)
	
	return input.replace(/\W*/g, '')
}

describe("JobSequence", function() {

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
		expect(job_sequence(input)).toEqual('');
  });

	it("should return a single job when that single job is passed", function(){
		var input = ' a => ';
		expect(job_sequence(input)).toEqual('a');
	})
	
	it("should return a multiple jobs in non-significant order when there are no dependencies", function(){
		var input = '	a => \n\
                  b => \n\
                  c => ';

		var result = job_sequence(input)
		expect(result).toContainAllOf(['a', 'b', 'c'])
	})
	
	it("should return multiple jobs in a significant order when dependencies exist", function() {
	  var input = '	a => \r\
                  b => c \r\
                  c =>';

		// result = job_sequence(input)
		
		var jobs = [];
		var result = '';
		var lines = input.split(/\r/g);
		
		for(var i = 0; i < lines.length; i++) {
			lines[i] = lines[i].replace(/\s*/g, '');

			var instruction = lines[i].split(/=>/);
			var job = instruction[0];

			if(jobs.indexOf(job) == -1) {
				jobs.push(job);
			}

			if(instruction[1]) {
				if(jobs.indexOf(instruction[1]) > -1) {
					jobs.splice(jobs.indexOf(instruction[1]),1);
				}
				
				var dependent_position = jobs.indexOf(job);
				
				jobs.splice(dependent_position, 0, instruction[1]);
				
			}
		}

		result = jobs.join('');

		expect(result).toContainAllOf(['a', 'b', 'c'])
		expect(result.indexOf('c')).toBeLessThan(result.indexOf('b'))
	});
});