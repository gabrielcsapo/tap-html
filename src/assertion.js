import React from 'react';

import { parseName } from './util';

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
          <span><span className="badge badge-danger"> <i className="text-white fa fa-times"/></span> { parseName(name) }</span>
        </div>
      }
      <div className="list-item-right"> <small> { end - start }ms </small> <i className="fa fa-clock-o"/> </div>
    </li>
  }
}

export default Assertion;
