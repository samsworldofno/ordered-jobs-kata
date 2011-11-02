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
