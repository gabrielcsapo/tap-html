const test = require('tape');

test('look at me!', (t) => {
  t.plan(5);

  t.test('hello world', (t) => {
    t.equal('hello world', 'hello world');
    t.end();
  });

  t.test('what what what', (t) => {
    t.equal('what what what', 'what what what');
    t.equal('what what what', 'what what what');
    t.equal('what what what', 'what what what');
    t.end();
  });

  t.test('should fail', (t) => {
    t.end('faiilllll');
  });

  t.test('what what what what!?', (t) => {
    t.equal('what what what', 'what what what');
    t.end();
  });

  t.test('should take a long time between tests', (t) => {
      t.plan(2);

      t.test('long 1', (t) => {
        setTimeout(() => {
          t.equal(true, true);
          t.end();
        }, 1000)
      });

      t.test('long 2', (t) => {
        setTimeout(() => {
          t.equal(true, true);
          console.log(Date.now());
          t.end();
        }, 3000)
      });
  });
});
