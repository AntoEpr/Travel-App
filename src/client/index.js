import {calculateTripLength} from './js/tripDuration'
import {calculateDaysLeft} from './js/daysLeft'
import {myFunction} from './js/formHandler'
import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/footer.scss'
export{
    calculateTripLength,
    myFunction,
    calculateDaysLeft
}
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners here
    const button = document.getElementById('button');
    button.addEventListener('click', myFunction);
  })