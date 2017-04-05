import React from 'react';
import ReactDOM from 'react-dom';
import imageViewer from './imageViewer';
import AppContainer from './components/appContainer';
import ModalBox from './components/modalBox';
import {initStorageData} from './localStorage/initialData.js'


document.addEventListener("DOMContentLoaded", function(event) {
            initStorageData();
            ReactDOM.render(<ModalBox/>, document.getElementById('modal'));
            ReactDOM.render(<AppContainer/>, document.getElementById('root')); 
});