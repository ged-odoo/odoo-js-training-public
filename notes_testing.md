# Notes: Testing Odoo

Testing UI code is an important, but often overlooked, part of a solid development
process. Odoo javascript test suite is quite large, but at the same time, not
particularly intuitive. So, let us take some time to discuss the main ideas.

Roughly speaking, there are two different kind of tests: integration tests (testing
a feature/business flow, by running all the relevant code) and unit tests (testing
some behaviour, usually by running only a component or a small unit of code).

Both of these kind of tests are different:

- integration tests are useful to make sure something works as expected. However,
  usually, they take more time to run, take more CPU/memory, and are harder to
  debug when they fail. On the flip side, they are necessary to prove that a system
  work and they are easier to write.

- unit tests are useful to ensure that a specific piece of code works. They are
  quick to run, are focused on a specific feature. When they fail, they identify
  a problem in a smaller scope, so it is easier to find the issue. However, they
  are usually harder to write, since one needs to find a way to _isolate_ as much
  as possible something.

Odoo (javascript) test suite contains both kind of tests: integration tests are
made with _tours_ and unit tests with _QUnit_

## Tours

A tour is basically a sequence of steps, with some selectors and parameters to
describe what the step should do (click on an element, fill an input, ...). Then
the code in the addon `web_tour` will execute each step sequentially, waiting
between each step if necessary.

## QUnit tests

A QUnit test is basically a short piece of code that exercise a feature, and
make some assertions. The main test suite can be run by simply going to the
`/web/tests` route.
