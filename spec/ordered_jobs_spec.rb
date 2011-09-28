require 'lib/job_sequence'

describe JobSequence do
  it "should return a blank string when a blank string is entered" do
    JobSequence.calculate("").should == ""
  end

  it "should return a single job when that single job is passed" do
    JobSequence.calculate(%q{ a => }).should == "a"
  end

  it "should return a multiple jobs in no-significant order when there are no dependencies" do
    result = JobSequence.calculate(%q{ a =>
                                       b =>
                                       c =>  })

    %w{a b c}.each do |l|
      result.should =~ /#{l}/
    end
  end

  it "should return multiple jobs in a significant order when dependencies exist" do
    result = JobSequence.calculate(%q{ a =>
                                       b => c
                                       c =>  })

    %w{a b c}.each do |l|
      result.should =~ /#{l}/
    end

    result.index("c").should < result.index("b")
  end

  it "should return multiple jobs in a significant order when multiple dependencies exist" do
    result = JobSequence.calculate(%q{ a =>
                                       b => c
                                       c => f
                                       d => a
                                       e => b
                                       f =>   })

    %w{a b c d e f}.each do |l|
      result.should =~ /#{l}/
    end

    result.index("f").should < result.index("c")
    result.index("c").should < result.index("b")
    result.index("b").should < result.index("e")
    result.index("a").should < result.index("d")
  end

  it "should raise an error if a job depends on itself" do
    expect {
      result = JobSequence.calculate(%q{ a =>
                                         b =>
                                         c => c })
    }.to raise_error(ArgumentError) { |error|
      error.message.should == "Job 'c' cannot depend upon itself"
    }
  end
end
