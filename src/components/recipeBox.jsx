import React from 'react';
import AppContainer from './appContainer';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {RECIPE_INDEX, CUISINE_TYPE, LOCALSTORAGE_DATA, OPENED_RECIPEBOX} from '../localStorage/localStorage';


export default class RecipeBox extends React.Component {
      constructor(props) {
          super(props);
          this.state = {sign: '+'};
          this._id = this.props.className + '_' + this.props.index;
          this._toggleIngredients = this._toggleIngredients.bind(this);
          this._toggleClass = this._toggleClass.bind(this);          
          this._removeRecipe = this._removeRecipe.bind(this);
          this._editRecipe = this._editRecipe.bind(this);
      }
    
      _toggleClass(elem, className) {
        
          if (Array.isArray(elem)) {              
              elem.forEach(function(el) {
                  let classes = el.className.split(" "), cls = "", index = -1;
                  if (el.className.indexOf(className) === -1) {
                      el.className += ' ' + className;
                  } else {
                      cls = classes.filter(function(val, ind) {if (val === className) {index = ind; return true;} else {return false;}});
                      cls !== "" ?  classes.splice(index, 1) : "";
                      el.className = classes.join(" ");
                  }
              });              
          } else {
              let classes = elem.className.split(" "), cls = "", index = -1;              
              if (elem.className.indexOf(className) === -1) {
                  elem.className += ' ' + className;
              } else {
                  cls = classes.filter(function(val, ind) {if (val === className) {index = ind; return true;} else {return false;}});
                  cls !== "" ?  classes.splice(index, 1) : "";
                  elem.className = classes.join(" ");
              }  
          }
      }
    
      _toggleIngredients(event, id=this._id) {          
          event.stopPropagation();
          let body = document.getElementById('body');
          let ingredientWrapper = document.getElementById(id);
          let ingredientContent = ingredientWrapper.firstElementChild;
          let recipeBox = ingredientWrapper.parentNode;
        
        // if recipeBox is not open, open it and close any other opened box
          if (recipeBox.className.indexOf('collapsed') !== -1) {            
              OPENED_RECIPEBOX !== "" ? document.getElementById(OPENED_RECIPEBOX).parentNode.click() : "";
              this._toggleClass([ingredientContent,ingredientWrapper,recipeBox], 'collapsed');
              body.className = this.props.className;
              
              OPENED_RECIPEBOX = id;
          } else {
              setTimeout(() => this._toggleClass(recipeBox, 'collapsed'), 400);
              this._toggleClass([ingredientContent, ingredientWrapper], 'collapsed');
              OPENED_RECIPEBOX = "";
          }
          this.setState({sign: this.state.sign === '+' ? this.state.sign = '-' : this.state.sign = '+'});
      }
    
      _editRecipe(event) {        
            event.stopPropagation(null, );
            RECIPE_INDEX = this.props.index;
            CUISINE_TYPE = this.props.className;
            document.getElementById('showModal').click();         
      }
    
      _removeRecipe(event) {
          event.stopPropagation();
          /*let result = confirm("Do you really want to delete this recipe?");
          if (result == true) {*/
              delete LOCALSTORAGE_DATA[this.props.className][this.props.index];           
              this._toggleIngredients(event, this._id);         
              ReactDOM.render(<AppContainer/>, document.getElementById('root'));
              try {
                  window.localStorage.setItem('recipes_rrmppw', JSON.stringify(LOCALSTORAGE_DATA));              
              } catch(e) {
                  throw e.message;
              }
         // }
      }
    
      render() {
          let {children, name, className, st, ...props} = this.props;
          let index = 0;
          
          // should be something like isSelected (http://stackoverflow.com/questions/28511207/react-js-onclick-event-handler)
          return (
              <div className='recipeWrapper'>
                  <div className={'recipeName collapsed ' + className} onClick={this._toggleIngredients} style={st}>{name}
                      <div className='recipeToggle' onClick={this._toggleIngredients}>{this.state.sign}</div>             
                      <div id={this._id} className='ingredientWrapper collapsed' style={st}>
                          <div className='ingredientContent collapsed' style={st}>
                              <div className='_label'>Ingredients</div>
                              <hr/>
                              <ul className='ingredientList'>
                                 {children.map((val) => <li key={index++} className='ingredient'>{val}</li>)}
                              </ul>
                              <ButtonToolbar className='btnToolbar'>
                                  <ButtonGroup>
                                      <Button bsStyle="danger" bsSize="small" onClick={this._removeRecipe}>Delete</Button>
                                  </ButtonGroup>
                                  <ButtonGroup>
                                      <Button bsStyle="default" bsSize="small" onClick={this._editRecipe}>Edit</Button>
                                  </ButtonGroup>
                              </ButtonToolbar>
                          </div>
                      </div>
                  </div>
              </div>
          );
      }
  }