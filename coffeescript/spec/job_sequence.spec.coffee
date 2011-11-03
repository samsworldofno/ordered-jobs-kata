JobSequence = require('../../javascript/lib/job_sequence').JobSequence;

describe "JobSequence", ->
  beforeEach ->
    @addMatchers
      toContainAllOf: (expected) ->
        for letter in expected
          return false unless letter in @actual
        true

      toHaveJobsInThisOrder: (a, b) ->
        @actual.indexOf(a) < @actual.indexOf(b)
  
  it "should return a blank string when a blank string is entered", ->
    input = ''
    sequence = new JobSequence(input)
    expect(sequence.output()).toEqual ''

  it "should return a single job when that single job is passed", ->
    input = ' a => '
    sequence = new JobSequence(input)
    expect(sequence.output()).toEqual 'a'

  it "should return multiple jobs in non-significant order when there are no dependencies", ->
    input = '''
              a => 
              b => 
              c => 
            '''

    sequence = new JobSequence(input)
    expect(sequence.output()).toContainAllOf ['a', 'b', 'c']

  it "should return multiple jobs in a significant order when dependencies exist", ->
    input = '''
              a => 
              b => c
              c => 
            '''

    result = new JobSequence(input).output()

    expect(result).toContainAllOf ['a', 'b', 'c']
    expect(result).toHaveJobsInThisOrder 'c', 'b'

  it "should return multiple jobs in a significant order when multiple dependencies exist", ->
    input = '''
              a => 
              b => c
              c => f
              d => a
              e => b
              f =>
            '''

  		result = new JobSequence(input).output()

  		expect(result).toContainAllOf ['a', 'b', 'c', 'd', 'e', 'f']
  		expect(result).toHaveJobsInThisOrder 'f', 'c'
  		expect(result).toHaveJobsInThisOrder 'c', 'b'
  		expect(result).toHaveJobsInThisOrder 'b', 'e'
  		expect(result).toHaveJobsInThisOrder 'a', 'd'
  		
  it "should raise an error if a job depends on itself", ->
    input = '''
              a =>
              b =>
              c => c
            '''
    sequence = new JobSequence(input);
    expect( -> sequence.output() ).toThrow 'jobs cannot depend upon themselves'

  it "should raise an error if a circular dependency is added", ->
    input = '''
              a => 
              b => c
              c => f
              d => a
              e =>
              f => b
            '''

    sequence = new JobSequence(input);
    expect( -> sequence.output() ).toThrow 'input string cannot create a circular dependency'