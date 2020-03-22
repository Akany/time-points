import React from 'react';
import ReactDom from 'react-dom';

import {App} from './app.jsx';

const holder = document.createElement('div');

ReactDom.render(<App />, holder, () => document.body.appendChild(holder));
