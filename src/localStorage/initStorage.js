import {DEFAULT_STORAGE_OBJ, LOCALSTORAGE_DATA} from './storageUnit';

export default function () {    
       LOCALSTORAGE_DATA = JSON.parse(window.localStorage.getItem('recipes_rrmppw')) || JSON.parse(JSON.stringify(DEFAULT_STORAGE_OBJ));
  }