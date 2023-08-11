import { calculateDaysLeft } from "./daysLeft";
export async function myFunction(event) {
   event.preventDefault();

    let destination = document.querySelector('#destination-input').value;
    const departureDate = document.getElementById('date-input').value;
    const returnDate=document.getElementById('return-date').value
    let encodedDestination = encodeURIComponent(destination);
    let sendData = {
        destination: destination,
        departureDate: departureDate,
        encodedDestination: encodedDestination,
    };
console.log(sendData)
const calculateResult = calculateDaysLeft(departureDate)
console.log(`Here is calculateResult: ${calculateResult}`)
    // Declaring postData before being used
    const postData = async (url = '', data) => {
      try{
      const response = await fetch(url, {
          method: "POST",  
          credentials: "same-origin",  
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data),  
      });
      if (!response.ok){
        throw new Error("Network response was not ok");
      }
          const newData = await response.json();
          console.log("This is the data received NewData")
          console.log(newData)
            const country = newData.geonames.geonames[0].countryName;
            console.log('Country Name:', country);
    
            // Updating UI
            const destinationCountry = document.getElementById('destination-country');
            destinationCountry.textContent = `Country: ${country}`;

            if (calculateResult <= 7 && calculateResult > 0){
              console.log("trip is within 1 week")
        //Declaring variables to store current weather data (sunrise, sunset, timezone, temperature, clouds, precip, uv)
        const maxTemp = newData.weather.data[0].app_max_temp;
        const minTemp = newData.weather.data[0].app_min_temp;
        const temp = newData.weather.data[0].temp;
        const clouds =newData.weather.data[0].clouds;
        const precip = newData.weather.data[0].precip;
        const uv = newData.weather.data[0].uv;
        console.log (`Weather: Max temperature: ${maxTemp}; Min temperature: ${minTemp}; temperature: ${temp}; clouds: ${clouds}; precip: ${precip}; UV Index: ${uv}`)
            const destinationWeather = document.getElementById('destination-weather');
            destinationWeather.innerHTML = `Weather: <br>
            Temperature: ${temp} <br>
            Max temperature: ${maxTemp}</br>
             Min temperature: ${minTemp} </br>
             Clouds: ${clouds} %<br>
             Precipitations: ${precip} % <br>
             UV Index: ${uv}`;

      //Display image
      const pixabayImageUrl = newData.pixabay.hits[0].webformatURL;
      //Update the image in HTML
      const imageElement = document.getElementById('destination-image');
      imageElement.setAttribute('src', pixabayImageUrl);
      console.log(`Image of ${destination} successfully added.`);
             return;
            }
            else if(calculateResult > 7){
              console.log("Trip is after more than 1 week")
              //Declaring variables to store current weather data (sunrise, sunset, timezone, temperature, clouds, precip, uv)
        const tempF = newData.forcast.data[0].temp;
        const cloudsF =newData.forcast.data[0].clouds;
        const precipF = newData.forcast.data[0].pop;
        const uvF = newData.forcast.data[0].uv;
        console.log (`Weather: temperature: ${tempF}; clouds: ${cloudsF}; precip: ${precipF}; UV Index: ${uvF}`)
      
        //Updating UI with current forecast data
      const destinationWeather = document.getElementById('destination-weather');
      destinationWeather.innerHTML = `Forecast weather: <br>
      Temperature: ${tempF} <br>
       Clouds: ${cloudsF} %<br>
       Precipitations: ${precipF} % <br>
       UV Index: ${uvF}`;

            //Display image
            const pixabayImageUrl = newData.pixabay.hits[0].webformatURL;
            //Update the image in HTML
            const imageElement = document.getElementById('destination-image');
            imageElement.setAttribute('src', pixabayImageUrl);
            console.log(`Image of ${destination} successfully added.`);
       return;
    }else{
      console.log("Departure date can't be before today")
      alert("Departure date can't be before today. Select another date")
      return;
    }
        

      } catch (error) {
          console.log('There was a problem with your fetch', error);  
      }
  };

    if (encodedDestination === "" || departureDate === "") {
        console.log("no destination or date input");
        alert("Please enter a destination/date. Both are required.");
        return;
    } else {
        await postData('/api', sendData) 
    }
}
