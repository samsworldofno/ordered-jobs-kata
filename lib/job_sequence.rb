class JobSequence
  attr_accessor :input

  def self.calculate(input)
    js = self.new(input)
    js.result
  end 

  def initialize(input)
    self.input = input
  end

  def jobs
    self.input.collect do |line|
      Job.new(line)
    end
  end

  def sequence
    jobs.reduce([]) do |sequence, job|
      if job.dependency
        raise ArgumentError, "Job '#{job.name}' cannot depend upon itself" if job.dependency == job.name

        sequence.delete(job.dependency)

        if sequence.include?(job.name)
          f = sequence.index(job.name)
          sequence.insert(f, job.dependency)
        else
          sequence << job.dependency
        end
      end

      sequence.push(job.name) unless sequence.include?(job.name)
      sequence
    end
  end

  def result
    return input if input == ""

    sequence.join
  end
end

class Job
  attr_accessor :name, :dependency

  def initialize(input)
    input.strip!

    parts = input.split(/ => ?/)
    parts.each(&:strip!)

    self.name = parts[0]
    self.dependency = parts[1]
  end
end
