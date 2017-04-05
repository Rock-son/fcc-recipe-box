import React from 'react';
import RecipeBox from './recipeBox';

import {LOCALSTORAGE_DATA} from '../localStorage/initialData';


export default class RecipeGroup extends React.Component {
      constructor(props) {
          super(props);
           this._getData = this._getData.bind(this);
      }
    
      _getData() {
          let {group} = this.props;
          let dataArr = [];
          const obj = LOCALSTORAGE_DATA[group];
          for (const key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              dataArr.push([key, obj[key]]); // obj[key] -> array: [..,[..]]
          }   
          return dataArr;
      }
    
      render() {
          let zIndex = 100;
          const group = this.props.group;
          let propsArr = this._getData();
          const enumRecipeBoxes = (props) => <RecipeBox  key={zIndex} st={{zIndex: zIndex--}} name={props[1][0]} children={props[1][1]} index={props[0]} className={group}/>;         
          // get recipe index and ingredients for every cuisine (Indian, Chinese, Italian and Greek)
          
          return (<div className={'col-xs-6 col-sm-4 col-lg-3 recipeGroup ' + group} data-bf={group + ' Cuisine'}>
                      {propsArr.map(enumRecipeBoxes)}
                  </div>
          );
      }
  }