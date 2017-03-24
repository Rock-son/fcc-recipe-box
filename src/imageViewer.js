import chinese from '../assets/chinese_food.jpg';
import italian from '../assets/greek_food.jpg';
import greek from '../assets/italian_food.jpg';
import indian from '../assets/indian_food.jpg';

export default () => {

    var doc = null;
    const cuisineArr = ['Indian', 'Greek', 'Italian', 'Chinese'];
    const imgArr = [indian, greek, italian, chinese];

    for (let i = 0; i < cuisineArr; i++) {
        doc = document.getElementsByClassName(cuisineArr[i])[0];
        doc.style.backgroundImage = `url(${imgArr[i]})`;
    }
}