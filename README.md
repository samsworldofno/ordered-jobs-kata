# Ordered Jobs Kata

Attempts at Martin Rue's
[Ordered Jobs kata](http://invalidcast.com/2011/09/the-ordered-jobs-kata).

## Ruby

Implementation in Ruby 1.8.7, BDD with RSpec.

To run the tests:

    $ cd ruby
    $ bundle install
    $ rspec
    
## JavaScript

Implementation in JavaScript, BDD (in the style of TDD as if you meant it) with Jasmine.

### Installation

    # npm install jasmine-node
    $ npm install jquery

To run the tests:

    $ cd javascript
    $ jasmine-node spec/

## CoffeeScript

Implementation in CoffeeScript, straight port from JavaScript.

### Installation 

As above for JavaScript

To run the tests:

    $ cd coffeescript
    $ jasmine-node spec/ --coffee