// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const M = require('mocha');
const mocha = new M;

mocha.addFile('./test/script.js');

function run2(fn) {

  if (this.files.length) {

    this.loadFiles();

  }

  var suite = this.suite;

  var options = this.options;

  options.files = this.files;

  var runner = new M.Runner(suite, options.delay);

  var reporter = new this._reporter(runner, options);

  runner.ignoreLeaks = options.ignoreLeaks !== false;

  runner.fullStackTrace = options.fullStackTrace;

  runner.asyncOnly = options.asyncOnly;

  runner.allowUncaught = options.allowUncaught;

  runner.forbidOnly = options.forbidOnly;

  runner.forbidPending = options.forbidPending;

  if (options.grep) {

    runner.grep(options.grep, options.invert);

  }

  if (options.globals) {

    runner.globals(options.globals);

  }

  if (options.growl) {

    this._growl(runner, reporter);

  }

  if (options.useColors !== undefined) {

    exports.reporters.Base.useColors = options.useColors;

  }

  M.reporters.Base.inlineDiffs = options.useInlineDiffs;

  M.reporters.Base.hideDiff = options.hideDiff;

 
  function done(failures) {
    fn = fn || function fn() {};
    if (reporter.done) {

      reporter.done(failures, fn);

    } else {

      fn && fn(failures);

    }

  }
  return runner.run(done);

}
mocha.run2 = run2;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/api/test', function(req, res) {
  console.log(req.body);
  res.json(req.body);
});

// listen for requests
const listener = app.listen(process.env.PORT||3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
  //test mocha.run(), mocha.run2() and mocha.run(function() {})
  setTimeout(function() {
  //mocha.ui('tdd').reporter('xunit').run(function() {});
  //mocha.ui('tdd').reporter('xunit').run2();
  mocha.ui('tdd').reporter('xunit').run();
  }, 1000);
  
 });

module.exports = app;
