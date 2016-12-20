import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App.jsx';

function main(){
    let container = document.getElementById('container');

    if ( container ){
        ReactDOM.render( React.createElement(App), container );
    }
}

document.addEventListener( "DOMContentLoaded", main );
