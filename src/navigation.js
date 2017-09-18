import 'psychic-ui/dist/psychic-min.css';
import './style.css';

import React from 'react';
import PropTypes from 'prop-types';

class Navigation extends React.Component {
  render() {
    const { count, pass, fail, skip, time, todo } = this.props;

    return (<div className="navbar navbar-white">
      <div className="container">
        <div className="navbar-title">
          <span className="tooltip-right" data-tooltip="Source"> <a href="https://github.com/gabrielcsapo/tap-html" target="_blank" rel="noopener noreferrer">tap-html</a> </span>
        </div>
        <div className="nav">
          <a><span className="badge tooltip-bottom" data-tooltip="Total Time"> <i className="fa fa-clock-o"/> </span>&nbsp;{ time }ms </a>
          <a><span className="badge badge-default tooltip-bottom" data-tooltip="Total Count"> <i className="text-white fa fa-tasks"/> </span>&nbsp;{ count } </a>
          <a><span className="badge badge-success tooltip-bottom" data-tooltip="Total Pass"> <i className="text-white fa fa-check"/> </span>&nbsp;{ pass } </a>
          <a><span className="badge badge-danger tooltip-bottom" data-tooltip="Total Fail"> <i className="text-white fa fa-times"/> </span>&nbsp;{ fail } </a>
          <a><span className="badge badge-warning tooltip-bottom" data-tooltip="Total Skip"> <i className="text-white fa fa-step-forward"/> </span>&nbsp;{ skip } </a>
          <a><span className="badge badge-info tooltip-bottom" data-tooltip="Total Todo"> <i className="text-white fa fa-pause"/> </span>&nbsp;{ todo } </a>
        </div>
      </div>
    </div>)
  }
}

Navigation.propTypes = {
  count: PropTypes.number,
  pass: PropTypes.number,
  fail: PropTypes.number,
  skip: PropTypes.number,
  time: PropTypes.number,
  todo: PropTypes.number
};

export default Navigation;
