import '../src/style.css';
import 'font-awesome/css/font-awesome.css';
import 'psychic-ui/dist/psychic-min.css';

import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
