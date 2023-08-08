import { userInput } from './js/formHandler';
import { performAction } from './js/app'
import { getWeatherData} from './js/app'
import { getWeatherDataByZip} from './js/app'
import { postData} from './js/app'
import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/footer.scss'
export{
    performAction,
    getWeatherData,
    getWeatherDataByZip,
    postData,
    userInput,
}