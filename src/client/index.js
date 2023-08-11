import {calculateDaysLeft} from './js/daysLeft'
import {myFunction} from './js/myFunction'
import { userInput } from './js/formHandler'
import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/footer.scss'
export{
    userInput,
    myFunction,
    calculateDaysLeft
}
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners here
    const button = document.getElementById('button');
    button.addEventListener('click', myFunction);
  })