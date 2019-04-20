const fs = require('fs');
const path = require('path');

const iconClock = (style) => `<svg style="${generateStyleString(style)}" aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>`;

const iconPause = `<svg style="margin-top:8px; color: white;height: 10px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>`;
const iconStepForward = `<svg style="margin-top:8px; color: white;height: 10px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" class="svg-inline--fa fa-step-forward fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path></svg>`;
const iconTimes = `<svg style="margin-top:8px; color: white;height: 10px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`;
const iconCheck = `<svg style="margin-top:8px; color: white;height: 10px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>`;
const iconTasks = `<svg style="margin-top:8px; color: white;height: 10px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tasks" class="svg-inline--fa fa-tasks fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M208 132h288c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zM64 368c-26.5 0-48.6 21.5-48.6 48s22.1 48 48.6 48 48-21.5 48-48-21.5-48-48-48zm92.5-299l-72.2 72.2-15.6 15.6c-4.7 4.7-12.9 4.7-17.6 0L3.5 109.4c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.3c4.7-4.7 12.3-4.7 17 0l17 16.5c4.6 4.7 4.6 12.3-.1 17zm0 159.6l-72.2 72.2-15.7 15.7c-4.7 4.7-12.9 4.7-17.6 0L3.5 269c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.7c4.7-4.7 12.3-4.7 17 0l17 17c4.6 4.6 4.6 12.2-.1 16.9z"></path></svg>`;

function parseName (name) {
  return name.indexOf('#') === 0 ? name.substring(2, name.length) : name;
}

function generateStyleString (obj) {
  return Object.keys(obj).map((k) => `${k}:${obj[k]}`).join(';');
}

function getTotalTests (tests) {
  return tests.map((test) => test['tests'] ? getTotalTests(test) : 1).reduce((a, b) => a + b, 0);
}

function getTotalAssertions (tests) {
  return tests.map((test) => test['tests'] ? getTotalAssertions(test) : test['assertions'].length).reduce((a, b) => a + b, 0);
}

function generateAssertion (assertion) {
  const { ok, name, end, start } = assertion;

  return `
    <ol class="list-item">
      ${ok === true
    ? `<div class="list-item-left">
          <span><span class="badge badge-success"> ${iconCheck} </span> ${parseName(name)}</span>
        </div>`
    : `<div class="list-item-left">
          <span><span class="badge badge-danger"> ${iconTimes} </span> ${parseName(name)}</span>
        </div>`
}
      <div class="list-item-right"> <small> ${end - start}ms </small> ${iconClock({ height: '8px', color: 'black' })} </div>
    </ol>
  `;
}

function generatePlan (test) {
  const { start, end, tests, name, type, assertions } = test;

  const style = {};

  if (!assertions) {
    style['margin-top'] = '50px';
    style['padding-top'] = '50px';
    style['padding-right'] = '15px';
    style['padding-left'] = '15px';
    style['padding-bottom'] = '25px';
  } else {
    style['margin-top'] = '60px';
    style['padding-bottom'] = '10px';
  }

  return `<div style="${generateStyleString(style)}">
    <div style="padding:10px;">
      ${!assertions
    ? `<h1>[${type}]&nbsp;${parseName(name)}</h1>`
    : `<h3>[${type}]&nbsp;${parseName(name)}</h3>`
}
      <br/>
      <small>
        ${iconClock({ height: '8px', color: 'black' })}&nbsp;${end - start}ms &nbsp;
      </small>
      ${!assertions
    ? `<small>
          ${getTotalTests(tests)} tests &nbsp;
          ${getTotalAssertions(tests)} assertions
          <hr/>
        </small>`
    : ''}
    </div>
    ${assertions
    ? `<ul class="list">
        ${assertions.map((assertion) => {
    return generateAssertion(assertion);
  }).join('')}
      </ul>`
    : ''}
    ${tests
    ? tests.map((test) => {
      return generatePlan(test);
    }).join('')
    : ''
}
  </div>`;
}

function generate (report) {
  const { count, pass, fail, skip, time, tests, todo } = report;

  const styles = [
    fs.readFileSync(require.resolve('psychic-ui/dist/psychic-min.css')),
    fs.readFileSync(path.resolve(__dirname, 'style.css'))
  ];

  return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>tap-html</title>
          <meta name=viewport content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
          ${
  styles.map((style) => {
    return `<style type="text/css">
                ${
  style.toString('utf8')
}
              </style>`;
  }).join('')
}
        </head>

        <body>
          <div id="root">
            <div style="height:100%;width:100%">
              <div class="navbar navbar-white">
                <div class="container">
                  <div class="navbar-title">
                    <span class="tooltip-right" data-tooltip="Source"> <a href="https://github.com/gabrielcsapo/tap-html" target="_blank" rel="noopener noreferrer">tap-html</a> </span>
                  </div>
                  <div class="nav">
                    <a>
                      <span class="badge tooltip-bottom" data-tooltip="Total Time"> ${iconClock({ 'margin-top': '5px', 'color': 'black', 'height': '15px' })} </span>&nbsp;${time}ms
                    </a>
                    <a>
                      <span class="badge badge-default tooltip-bottom" data-tooltip="Total Count"> ${iconTasks} </span>&nbsp;${count}
                    </a>
                    <a>
                      <span class="badge badge-success tooltip-bottom" data-tooltip="Total Pass"> ${iconCheck} </span>&nbsp;${pass}
                    </a>
                    <a>
                      <span class="badge badge-danger tooltip-bottom" data-tooltip="Total Fail"> ${iconTimes} </span>&nbsp;${fail}
                    </a>
                    <a>
                      <span class="badge badge-warning tooltip-bottom" data-tooltip="Total Skip"> ${iconStepForward} </span>&nbsp;${skip}
                    </a>
                    <a>
                      <span class="badge badge-info tooltip-bottom" data-tooltip="Total Todo"> ${iconPause} </span>&nbsp;${todo}
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div style="width:550px;margin:0 auto;">
                  ${tests.map((test) => {
    return generatePlan(test);
  }).join('')}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`;
}

module.exports = {
  generate
};
