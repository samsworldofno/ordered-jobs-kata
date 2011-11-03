JobSequence = require('../../javascript/lib/job_sequence').JobSequence;

describe "JobSequence", ->
  beforeEach ->
    @addMatchers
      toContainAllOf: (expected) ->
        for letter in expected
          false unless letter in @actual
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

  it "should return a multiple jobs in non-significant order when there are no dependencies", ->
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