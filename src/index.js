import '../src/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import imageViewer from './imageViewer';
import AppContainer from './components/appContainer';
import ModalBox from './components/modalBox';
import updateStorageData from './localStorage/initStorage'


document.addEventListener("DOMContentLoaded", function(event) {
            updateStorageData();
            ReactDOM.render(<ModalBox/>, document.getElementById('modal'));
            ReactDOM.render(<AppContainer/>, document.getElementById('root')); 
});