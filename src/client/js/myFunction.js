export async function myFunction(event) {
   event.preventDefault();

    let destination = document.querySelector('#destination-input').value;
    const departureDate = document.getElementById('date-input').value;
    let encodedDestination = encodeURIComponent(destination);
    let sendData = {
        destination: destination,
        departureDate: departureDate,
    };
console.log(sendData)

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
          if (newData.geonames && newData.geonames.length > 0) {
            const country = newData.geonames[0].countryName;
            console.log('Country Name:', country);
    
            // Updating UI with country name
            const destinationCountry = document.getElementById('destination-country');
            destinationCountry.textContent = `Country: ${country}`;
        } else {
            console.log('No geonames data found in the response.');
        }
      } catch (error) {
          console.log('There was a problem with your fetch', error);  
      }
  };

  // Async GET
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};


    if (encodedDestination === "" || departureDate === "") {
        console.log("no destination or date input");
        alert("Please enter a destination/date. Both are required.");
        return;
    } else {
        await postData('/api', sendData) 
        .then(function(data){
          retrieveData('/all')
        })
        .catch(error => {
          console.log('Error:', error);
          // Handle the error
      });

  }

}
