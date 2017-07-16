const Parser   = require('tap-parser');
const Through  = require('through2');
const Duplexer = require('duplexer');
const Generate = require('./lib/generate');

module.exports = () => {
  var tap = new Parser();
  var out = Through.obj();
  var dup = Duplexer(tap, out);

  var currentPlan = -1;
  var currentAssertion = -1;
  var data = [];
  var plan = null;

  var startTime = Date.now();

  tap.on('comment', (res) => {
    if(!plan) {
      data.push({ type: 'test', name: res, start: Date.now(), assertions: [] });

      // get the current index of the plan
      // so that we can use this to push the current assertions to it
      currentPlan += 1;
      currentAssertion = -1;
    }
  });

  tap.on('plan', (res) => {
    plan = res;
  });

  tap.on('extra', (res) => {
    data[currentPlan]['assertions'][currentAssertion]['console'] += `${res}\n`;
  });

  tap.on('assert', (res) => {
    data[currentPlan].assertions.push({
      type: 'assert',
      number: res.id,
      name: res.name,
      ok: res.ok,
      diag: res.diag,
      console: '',
      end: Date.now()
    });
    currentAssertion += 1;
  });

  tap.on('complete', (res) => {
    res['time'] = Date.now() - startTime;

    var plan = -1;

    // combine and clean up tests
    for(var i = 0; i < data.length; i++) {
      // This is a top level plan
      if(data[i].assertions.length == 0) {
        // move on with the tests
        plan = i;
        data[plan].tests = [];
        delete data[i].assertions;
      } else {
        // We know this is part of the currentPlan
        data[plan].tests.push(data[i]);
        delete data[i];
      }
    }

    data = data.filter((d) => d > '');

    function calculateTime(test) {
      test.end = test.assertions[test.assertions.length - 1].end;
      test.assertions.forEach((assertion) => {
        assertion.start = test.start;
      });
    }
    data.forEach((plan) => {
      for(var i = 0; i < plan.tests.length; i++) {
        calculateTime(plan.tests[i]);
      }
      plan.end = plan.tests[plan.tests.length - 1].end;
    });

    res['tests'] = data
    Generate(res, process.cwd());
  });

  return dup;
};
