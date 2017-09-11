const test = require('tape');
const fs = require('fs');
const path = require('path');

const parser = require('../index');

test('tap-html', (t) => {
  t.plan(3);

  t.test('should be able to parse flat test', (t) => {
    const flat = fs.createReadStream(path.resolve(__dirname, './fixtures/flat.txt'));
    flat.pipe(parser((res) => {
      t.equal(res.ok, true);
      t.equal(res.count, 6);
      t.equal(res.pass, 6);
      t.equal(res.fail, 0);
      t.equal(res.bailout, false);
      t.equal(res.todo, 0);
      t.equal(res.skip, 0);
      t.ok(Array.isArray(res.failures));
      t.equal(res.failures.length, 0);
      t.equal(typeof res.time, 'number');

      t.ok(Array.isArray(res.tests));

      t.equal(res.tests[0].type, 'test');
      t.equal(res.tests[0].name, '# serial connection');
      t.equal(typeof res.tests[0].start, 'number');
      t.equal(typeof res.tests[0].end, 'number');
      t.equal(res.tests[0].assertions.length, 1);

      t.equal(res.tests[0].assertions[0].type, 'assert');
      t.equal(res.tests[0].assertions[0].number, 1);
      t.equal(res.tests[0].assertions[0].diag, undefined);
      t.equal(typeof res.tests[0].assertions[0].end, 'number');
      t.equal(typeof res.tests[0].assertions[0].start, 'number');

      t.equal(res.tests[1].type, 'test');
      t.equal(res.tests[1].name, '# ble');
      t.equal(typeof res.tests[1].start, 'number');
      t.equal(typeof res.tests[1].end, 'number');
      t.equal(res.tests[1].assertions.length, 5);

      t.equal(res.tests[1].assertions[0].type, 'assert');
      t.equal(res.tests[1].assertions[0].number, 2);
      t.equal(res.tests[1].assertions[0].diag, undefined);
      t.equal(res.tests[1].assertions[0].name, 'got device discover');
      t.equal(typeof res.tests[1].assertions[0].end, 'number');
      t.equal(typeof res.tests[1].assertions[0].start, 'number');

      t.equal(res.tests[1].assertions[1].type, 'assert');
      t.equal(res.tests[1].assertions[1].number, 3);
      t.equal(res.tests[1].assertions[1].diag, undefined);
      t.equal(res.tests[1].assertions[1].name, 'device connected');
      t.equal(typeof res.tests[1].assertions[1].end, 'number');
      t.equal(typeof res.tests[1].assertions[1].start, 'number');

      t.equal(res.tests[1].assertions[2].type, 'assert');
      t.equal(res.tests[1].assertions[2].number, 4);
      t.equal(res.tests[1].assertions[2].diag, undefined);
      t.equal(res.tests[1].assertions[2].name, 'got characteristic');
      t.equal(typeof res.tests[1].assertions[2].end, 'number');
      t.equal(typeof res.tests[1].assertions[2].start, 'number');

      t.equal(res.tests[1].assertions[3].type, 'assert');
      t.equal(res.tests[1].assertions[3].number, 5);
      t.equal(res.tests[1].assertions[3].diag, undefined);
      t.equal(res.tests[1].assertions[3].name, 'subcribed');
      t.equal(typeof res.tests[1].assertions[3].end, 'number');
      t.equal(typeof res.tests[1].assertions[3].start, 'number');

      t.equal(res.tests[1].assertions[4].type, 'assert');
      t.equal(res.tests[1].assertions[4].number, 6);
      t.equal(res.tests[1].assertions[4].diag, undefined);
      t.equal(res.tests[1].assertions[4].name, 'got round-trip message');
      t.equal(typeof res.tests[1].assertions[4].end, 'number');
      t.equal(typeof res.tests[1].assertions[4].start, 'number');
      t.end();
    }));
  });

  t.test('should be able to parse nested test', (t) => {
    const flat = fs.createReadStream(path.resolve(__dirname, './fixtures/nested.txt'));
    flat.pipe(parser((res) => {
      t.equal(res.ok, true);
      t.equal(res.count, 13);
      t.equal(res.pass, 13);
      t.equal(res.fail, 0);
      t.equal(res.bailout, false);
      t.equal(res.todo, 0);
      t.equal(res.skip, 0);
      t.ok(Array.isArray(res.failures));
      t.equal(res.failures.length, 0);
      t.equal(typeof res.time, 'number');

      t.equal(res.tests[0].type, 'test');
      t.equal(res.tests[0].name, '# json-ex');
      t.equal(typeof res.tests[0].start, 'number');
      t.equal(typeof res.tests[0].end, 'number');

      t.equal(res.tests[0].tests[0].type, 'test');
      t.equal(res.tests[0].tests[0].name, '# should be able to stringify a basic javascript object');
      t.equal(typeof res.tests[0].tests[0].start, 'number');
      t.equal(typeof res.tests[0].tests[0].end, 'number');
      t.equal(res.tests[0].tests[0].assertions.length, 1);

      t.equal(res.tests[0].tests[1].type, 'test');
      t.equal(res.tests[0].tests[1].name, '# should be able to stringify a complex javascript object');
      t.equal(typeof res.tests[0].tests[1].start, 'number');
      t.equal(typeof res.tests[0].tests[1].end, 'number');
      t.equal(res.tests[0].tests[1].assertions.length, 1);

      t.equal(res.tests[0].tests[2].type, 'test');
      t.equal(res.tests[0].tests[2].name, '# should be able to parse a complex object');
      t.equal(typeof res.tests[0].tests[2].start, 'number');
      t.equal(typeof res.tests[0].tests[2].end, 'number');
      t.equal(res.tests[0].tests[2].assertions.length, 4);

      t.equal(res.tests[0].tests[3].type, 'test');
      t.equal(res.tests[0].tests[3].name, '# should be able to stringify a complex javascript object and parse it back');
      t.equal(typeof res.tests[0].tests[3].start, 'number');
      t.equal(typeof res.tests[0].tests[3].end, 'number');
      t.equal(res.tests[0].tests[3].assertions.length, 7);
      t.end();
    }));
  });

  t.test('should be able to parse empty test', (t) => {
    const flat = fs.createReadStream(path.resolve(__dirname, './fixtures/empty.txt'));
    flat.pipe(parser((res) => {
      t.equal(res.ok, true);
      t.equal(res.count, 0);
      t.equal(res.pass, 0);
      t.equal(res.fail, 0);
      t.equal(res.bailout, false);
      t.equal(res.todo, 0);
      t.equal(res.skip, 0);
      t.ok(Array.isArray(res.failures));
      t.equal(res.failures.length, 0);
      t.equal(typeof res.time, 'number');

      t.equal(res.tests[0].type, 'test');
      t.equal(res.tests[0].name, '# test this');
      t.equal(typeof res.tests[0].start, 'number');
      t.equal(typeof res.tests[0].end, 'number');
      t.equal(res.tests[0].tests.length, 0);

      t.end();
    }));
  });

});
