import React from 'react';
import {render} from 'react-dom';

import App from './containers/App';



function run()
{
    render(
        <App />,
        document.getElementById("root")
    );
}

run();
