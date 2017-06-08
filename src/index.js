import './style.css';
import 'psychic-ui/dist/psychic-min.css';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

function parseName(name) {
  return name.indexOf('#') == 0 ? name.substring(2, name.length) : name;
}

class Assertion extends React.Component {
  render() {
    const { ok, name, number, end, start } = this.props;

    return <li className="list-item" key={ number }>
      {ok == true ?
        <div className="list-item-left">
          <span><span className="badge badge-success"> <i className="text-white fa fa-check"/></span> { parseName(name) }</span>
        </div>
      :
        <div className="list-item-left">
          <span><span className="badge badge-warning"> <i className="text-white fa fa-times"/></span> { parseName(name) }</span>
        </div>
      }
      <div className="list-item-right"> <small> { end - start }ms </small> <i className="fa fa-clock-o"/> </div>
    </li>
  }
}

class Plan extends React.Component {
  getTotalTests(tests) {
    return tests.map((test) => test['tests'] ? getTotalTests(test) : 1).reduce((a, b) => a + b);
  }
  getTotalAssertions(tests) {
    return tests.map((test) => test['tests'] ? getTotalAssertions(test) : test['assertions'].length).reduce((a, b) => a + b);
  }
  render() {
    const { start, end, tests, name, type, assertions } = this.props;

    const style = {};

    if(!assertions) {
      style['marginTop'] = '50px';
      style['paddingTop'] = '50px';
      style['paddingRight'] = '15px';
      style['paddingLeft'] = '15px';
      style['paddingBottom'] = '25px';
    } else {
      style['paddingTop'] = '10px';
      style['paddingBottom'] = '10px';
    }

    return (
      <div style={ style }>
        <div style={{ padding: '10px' }}>
          { !assertions ?
            <h1>{ parseName(name) }</h1>
          :
            <h3>{ parseName(name) }</h3>
          }
          <br/>
          <small>
            <i className="fa fa-clock-o"/>&nbsp;{ end - start }ms &nbsp;
          </small>
          { !assertions ?
            <small>
              { this.getTotalTests(tests) } tests &nbsp;
              { this.getTotalAssertions(tests)  } assertions
              <hr/>
            </small>
          : '' }
        </div>
        { assertions ?
          <ul className="list">
            { assertions.map((assertion) => {
              return <Assertion {...assertion}/>
            })}
          </ul>
        : '' }
        { tests && tests.map((test) => {
          return <Plan {...test}/>
        })}
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    const { tests, count, pass, fail, skip, time, todo } = this.props;

    return (<div style={{ "height":"100%", "width":"100%" }}>
      <div className="navbar">
        <div className="container">
          <div className="navbar-title"><span className="text-black"> tap-html </span></div>
          <div className="nav">
            <a><span className="badge"> <i className="fa fa-clock-o"/> </span>&nbsp;{ time }ms </a>
            <a><span className="badge badge-success"> <i className="text-white fa fa-check"/> </span>&nbsp;{ pass } </a>
            <a><span className="badge badge-warning"> <i className="text-white fa fa-times"/> </span>&nbsp;{ fail } </a>
            <a><span className="badge badge-info"> <i className="text-white fa fa-pause"/> </span>&nbsp;{ skip } </a>
            <p style={{ "marginLeft": "20px", "marginRight": "5px" }}>|</p>
            <a href="https://github.com/gabrielcsapo/tap-html" target="_blank" rel="noopener noreferrer">Source</a>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '550px', margin: '0 auto' }}>
          {tests.map((test) => {
            return <Plan {...test}/>
          })}
        </div>
      </div>
    </div>)
  }
}

render(<Main {...report}/>, document.getElementById('root'));
