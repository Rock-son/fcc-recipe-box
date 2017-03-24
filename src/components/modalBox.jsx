import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonGroup, ButtonToolbar, FormControl, FormGroup, Modal, ControlLabel} from 'react-bootstrap';
import {DEFAULT_STORAGE_OBJ, RECIPE_INDEX, CUISINE_TYPE, LOCALSTORAGE_DATA, OPENED_RECIPEBOX} from '../localStorage/localStorage';


export default class ModalBox extends React.Component {
      constructor() {
          super();
          this.state = {showModal: false, recipeName: "", recipeIngredients: "", option: "", type: ""};
          this._open = this._open.bind(this);
          this._close = this._close.bind(this);
          this._saveData = this._saveData.bind(this);
          this._saveToLocalStorage = this._saveToLocalStorage.bind(this);
          this._storageAvailable = this._storageAvailable.bind(this);
          this._getInputValidation = this._getInputValidation.bind(this);
          this._handleChange = this._handleChange.bind(this);
          //if localStorage is available and it is a first app start, save default recipes in localStorage
          if (this._storageAvailable('localStorage')) {
              if(!window.localStorage.getItem('recipes_rrmppw')) {                
                  this._saveToLocalStorage('recipes_rrmppw', JSON.stringify(DEFAULT_STORAGE_OBJ));                  
              }
          } else {
              alert('You need a modern browser for properly viewing this application!');
          }
      }
      
      _saveData() {
          // not letting users save recipes without choosing cuisine type!
          let chosenCuisine = this.state.option;
          if (chosenCuisine === 'Select') {
              alert('Please select Cuisine Type!');
              return;
          }
          let lastIndex = Object.keys(LOCALSTORAGE_DATA[chosenCuisine]).slice(-1);
          lastIndex++;
          if (this.state.type === 'edit') {
              let recipeIngredients;
              Array.isArray(this.state.recipeIngredients) ? recipeIngredients =  this.state.recipeIngredients : recipeIngredients = this.state.recipeIngredients.split(',').map((item)=> item.trim());
              // if recipe changes cuisine, delete old object and add the recipe to new cuisine
              if (CUISINE_TYPE !== chosenCuisine) {
                    delete LOCALSTORAGE_DATA[CUISINE_TYPE][RECIPE_INDEX];
                    LOCALSTORAGE_DATA[chosenCuisine][lastIndex] = [this.state.recipeName, recipeIngredients];
                    document.getElementById(OPENED_RECIPEBOX).click();
              } else {                
                    LOCALSTORAGE_DATA[CUISINE_TYPE][RECIPE_INDEX] = [this.state.recipeName, recipeIngredients];
              }              
          } else if (this.state.type === 'saveNew') {
            
                let recipeName = document.getElementById('recipeName').value;
                let recipeIngredients = document.getElementById('ingredients').value;                
                recipeIngredients = recipeIngredients.split(',').map((item)=> item.trim());
                LOCALSTORAGE_DATA[chosenCuisine][lastIndex] = [recipeName, recipeIngredients];
          }
          //enumerate new order of ingredients, RecipeBoxes and RecipeGroups
          ReactDOM.render(<AppContainer/>, document.getElementById('root')); 
          // save data to localStorage and close Modal
          this._saveToLocalStorage('recipes_rrmppw', JSON.stringify(LOCALSTORAGE_DATA));
          this._close();
      }
    
      _saveToLocalStorage(storage, propObj) {
          try {
              window.localStorage.setItem( storage, propObj );
              return true;
          } catch(e) {
              return false;
          }
      }
    
      _storageAvailable(type) {
            try {
                var storage = window[type],
                x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            catch(e) {
                return false;
            }
      }
    
      _open() {          
          if (RECIPE_INDEX > -1) {
              this.setState({showModal: true,
                             type: 'edit',
                             option: CUISINE_TYPE,
                             recipeName: LOCALSTORAGE_DATA[CUISINE_TYPE][RECIPE_INDEX][0],
                             recipeIngredients: LOCALSTORAGE_DATA[CUISINE_TYPE][RECIPE_INDEX][1]});              
          } else {
              this.setState({showModal: true, type: 'saveNew', option: "Select", recipeName: "", recipeIngredients: ""});              
          }          
      }
    
      _close() {
          RECIPE_INDEX = -1;
          CUISINE_TYPE = "";
          this.setState({showModal: false});
      }
    
      _getInputValidation(type) {
        if (type === 'ingredients') {
              const length = this.state.recipeIngredients.length;
              if (length < 100 && length > 0) return 'success';
              else if (length > 80) return 'warning';
              else if (length > 99) return 'error';
        } else if (type === 'recipeName') {
              const length = this.state.recipeName.length;
              if (length < 20 && length > 0) return 'success';
              else if (length > 19 && length > 0) return 'error';
        } else if (type === 'ctrlSelect') {
              const val = this.state.option;
              if (val === 'Select') return 'error';
              else if (val !== 'Select') return 'success';
        }
    }
      
    _handleChange(e) {
        if (e.target.id === 'recipeName') {
            this.setState({ recipeName: e.target.value });          
        } else if (e.target.id === 'ingredients') {
            this.setState({ recipeIngredients: e.target.value });  
        } else if (e.target.id === 'ctrlSelect'){
            this.setState({ option: e.target.value });
        }
    }
      
    render() {
          let title = "", saveBtnText = "", type= "";
          RECIPE_INDEX > -1 ? (title = 'Edit Recipe', saveBtnText = 'Save Changes') : (title = 'Add a Recipe', saveBtnText = 'Save Recipe');

          return (
            <div className='col-xs-12'>
                <br/>
                <Button id='showModal' bsStyle="success" bsSize="medium" onClick={this._open}>Add Recipe</Button>              
                <Modal show={this.state.showModal} onHide={this._close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>   
                    <Modal.Body>
                        <FormGroup controlId="ctrlSelect" validationState={this._getInputValidation('ctrlSelect')} onChange={this._handleChange}>
                            <ControlLabel>Select Cuisine</ControlLabel>
                            <FormControl componentClass="select" placeholder="Select" value={this.state.option}>
                                <option value='Select'>Select</option>
                                <option value='Indian'>Indian</option>
                                <option value='Chinese'>Chinese</option>
                                <option value='Italian'>Italian</option>
                                <option value='Greek'>Greek</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="recipeName" validationState={this._getInputValidation('recipeName')}>
                            <ControlLabel>Recipe Name</ControlLabel>
                            <FormControl type="text" value={this.state.recipeName} placeholder="Recipe Name" onChange={this._handleChange}/>
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="ingredients" validationState={this._getInputValidation('ingredients')}>  
                            <ControlLabel>Ingredients</ControlLabel>
                            <FormControl type="text" value={this.state.recipeIngredients} placeholder="Enter ingredients, separated by commas!" onChange={this._handleChange}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Modal.Body>            
                    <Modal.Footer>
                        <Button onClick={this._saveData} bsStyle="primary" id="addButton">{saveBtnText}</Button>
                        <Button onClick={this._close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
          );
        }
    }