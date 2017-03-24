import React from 'react';
import RecipeGroup from './recipeGroup';
import {LOCALSTORAGE_DATA} from '../localStorage/localStorage';


export default class AppContainer extends React.Component {
      constructor(props) {
          super(props);
          this._getData = this._getData.bind(this);
      }
    
      _getData() {
          let groupArr = [];
          for (const key in LOCALSTORAGE_DATA) {
               if (!LOCALSTORAGE_DATA.hasOwnProperty(key)) continue;
               groupArr.push(key);
          }
          return groupArr;          
      }
    
      render() {
          let groupArr = this._getData();
          let index = 0;
          // get all the different groups in localstorage object (Indian, Chinese, Italian and Greek Cuisine)                      
          return <div id='appContainer'>{groupArr.map((grName) => <RecipeGroup key={index++} group={grName}/>)}</div>;
      }
  }
