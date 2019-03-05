const Parser = require('tap-parser');
const Through = require('through2');
const Duplexer = require('duplexer');

module.exports = function tapHTML(callback) {
  const tap = new Parser();
  const out = Through.obj();
  const dup = Duplexer(tap, out);

  let currentPlan = -1;
  let currentAssertion = -1;
  let data = [];
  let plan = null;

  const startTime = Date.now();

  tap.on('comment', (res) => {
    if (!plan) {
      data.push({
        type: 'test',
        name: res,
        start: Date.now(),
        assertions: []
      });

      // get the current index of the plan
      // so that we can use this to push the current assertions to it
      currentPlan += 1;
      currentAssertion = -1;
    }
  });

  tap.on('plan', (res) => {
    if(typeof res !== 'string') return;

    plan = res;
  });

  tap.on('extra', (res) => {
    if (data && currentPlan > 0 && currentAssertion > 0) {
      data[currentPlan]['assertions'][currentAssertion]['console'] += `${res}\n`;
    }
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
    for (var i = 0; i < data.length; i++) {
      // trims the name from having any extra new line breaks
      data[i].name = data[i].name.trim();

      // This is a top level plan
      if (data[i].assertions.length == 0) {
        // move on with the tests
        plan = i;
        data[plan].tests = [];
        delete data[i].assertions;
      } else if (plan == -1) {
        // this is flat plan that has no parent do nothing
      } else {
        // We know this is part of the currentPlan
        if (!data[plan]) {
          data[plan] = {
            tests: []
          };
        } else {
          data[plan].tests = data[plan].tests || [];
        }

        data[plan].tests.push(data[i]);
        delete data[i];
      }
    }

    data = data.filter((d) => d > '');

    function calculateTime(test) {
      if (test.end) return;

      test.end = test.assertions[test.assertions.length - 1].end;
      test.assertions.forEach((assertion) => {
        assertion.start = test.start;
      });
    }
    data.forEach((plan) => {
      if (plan.tests && plan.tests.length === 0) {
        // this is an empty test
        plan.end = plan.start;
      } else if (plan.tests && plan.tests.length > 0) {
        for (var i = 0; i < plan.tests.length; i++) {
          calculateTime(plan.tests[i]);
        }
        plan.end = plan.tests[plan.tests.length - 1].end;
      } else {
        // this is a flat test with only assertions
        calculateTime(plan);
      }
    });

    res['tests'] = data
    callback(res);
  });

  return dup;
};
