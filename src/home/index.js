import React from 'react';
import {render} from 'react-dom';

import App from './components/App';



function run()
{
    console.log(jQuery);
    render(
        <App />,
        document.getElementById("root")
    );
}

run();
