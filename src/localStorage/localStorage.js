
export const DEFAULT_STORAGE_OBJ = {
      Indian: {0:['Curry Chicken', ['2 Boneless Chicken Breast', '3 Tablespoons Olive Oil', '1 Small Onion', '2 Cloves Garlic', '3 Tablespoons Curry', '1 Teaspoon Ground Cinnamon', '1 Teaspoon Paprika', '1 Bay Leaf']], 1: ['Plain Chicken', ['Chicken', 'Butter', 'Spices']], 2:['Beef Vindaloo', ['1/4 Cup White Vinegar', '1/4 Cup Garlic Paste', '3 Tablespoons Ginger Paste', '2 Tablespoons Plain Yogurt', '2 Tablespoons Salt', '1 Tablespoon Ground Black Pepper', '1/4 Cup Vegetable Oil', '2 Onion, chopped', '4 Tomatoes, chopped', '2 Pounds Boneless Beef Chuck', '1 Cup Water']]},
    
      Chinese: {0: ['Hot & Sour Soup',['4 Dried Chinese Fungi', '2 Tablespoons Canola Oil', '1 -Inch Piece Fresh Ginger', '1 Tablespoon Red Chile Paste', '1/2 Cup Canned Bamboo Shoots', '1/4 Pound Barbecued Pork', '1/4 Cup Soy Sauce', '1/4 Cup Rice Vinegar', '1 Teaspoon Salt', '1 Teaspoon Ground White Pepper', 'Pinch Sugar', '2 Quarts Chinese Chicken Stock', '1 Square Firm Tofu', '3 Tablespoons Cornstarch', '1 Large Egg', 'Chopped Green Onions and Cilantro Leaves']], 1: ['Gong Bao Chicken', ['2 Boneless Chicken Breast', ' 3 Garlic Cloves', 'Ginger', '5 Spring Onions', 'Dried Chiles', '2 Tablespoons Cooking Oil', ' 1 Teaspoon Whole Sichuan Pepper', '3 Ounces (75 grams) Roasted Peanuts']], }, 
    
      Italian: {0:['Pizza',['Wheat Flour', 'Eggs', 'Yeast', 'Bacon','Mozzarella', 'Tomato Sauce', 'Oregano']], 1: ['Macaroni', ['Macaroni', 'Olive Oil', 'Garlic', 'Chili']]},
    
      Greek: {0:['Tzatziki',['Yoghurt','Cucumber','Garlic', 'Olive Oil']], 1: ['Greek Salad',['Tomatoes','Sliced Cucumbers','Onion', 'Feta Cheese', 'Olives', 'Oregano']], 2: ['Dakos',['Dry Barley Rusk', 'Olive Oil', 'Diced Tomatoes', 'Feta Cheese', 'Herbs']]}
  };
  // for adding and editing recipes
export let RECIPE_INDEX = -1;
export let CUISINE_TYPE = "";
export let LOCALSTORAGE_DATA = null;
export let OPENED_RECIPEBOX = "";