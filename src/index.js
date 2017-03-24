import '../src/style.scss';
import React from 'react';
import imageViewer from './imageViewer';
import updateStorageData from './localStorage/initStorage'
import {DEFAULT_STORAGE_OBJ, RECIPE_INDEX, CUISINE_TYPE, LOCALSTORAGE_DATA, OPENED_RECIPEBOX} from './storageUnit';


document.addEventListener("DOMContentLoaded", function(event) {
            ReactDOM.render(<ModalBox/>, document.getElementById('modal'));
            ReactDOM.render(<AppContainer/>, document.getElementById('main')); 
}); 