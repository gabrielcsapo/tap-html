import React from 'react';

import { storiesOf } from '@storybook/react';

import Assertion from '../src/assertion';
import Plan from '../src/plan';
import Navigation from '../src/navigation';

storiesOf('Assertion', module)
  .add('succesful', () => {
    const assert = {"type":"assert","number":1,"name":"should be equal","ok":true,"console":"","end":1505701339018,"start":1505701339017}
    return <ul className="list">
      <Assertion {...assert}/>
    </ul>
  })
  .add('failure', () => {
    const assert = {"type":"assert","number":1,"name":"should be equal","ok":false,"console":"","end":1505701339018,"start":1505701339017}
    return <ul className="list">
      <Assertion {...assert}/>
    </ul>
  })

storiesOf('Plan', module)
  .add('mixed', () => {
    const plan = {
      "type": "test",
      "name": "# should be able to parse flat test",
      "start": 1505701339017,
      "assertions": [{
        "type": "assert",
        "number": 1,
        "name": "should be equal",
        "ok": true,
        "console": "",
        "end": 1505701339018,
        "start": 1505701339017
      }, {
        "type": "assert",
        "number": 2,
        "name": "should be equal",
        "ok": false,
        "console": "",
        "end": 1505701339018,
        "start": 1505701339017
      }],
      "end": 1505701339019
    }

    return <Plan {...plan}/>
  });

storiesOf('Navigation', module)
  .add('basic navigation', () => {
    const opts = {
      count: 15,
      pass: 7,
      fail: 3,
      skip: 5,
      time: 150,
      todo: 0
    };
    return <Navigation {...opts}/>
  })
