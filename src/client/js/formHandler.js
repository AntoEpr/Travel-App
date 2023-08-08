function handleSubmit(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Event listener for submit button
    const userInput = document.getElementById('button');

    // Debugging
    console.log("Checking handleSubmit");

    userInput.addEventListener('click', () => {
        event.preventDefault();

        // Input variables
        let destination = document.querySelector('#destination-input').value;
        let departureDate = document.querySelector('#date-input').value;

        // Validation for date field
        if (departureDate.length === 0 || destination.length === 0) {
            alert('Departure date and destination are required.');
            return;
        }

        // Debug
        console.log("step 2");

        // API fetch
        try {
            fetch('http://localhost:5500/all', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ destination }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed with status ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                // Display API data
                console.log(data);
                console.log("step 3");
                // Destination name
                document.querySelector('#destination-name').innerHTML = `${data.geonamesData.geonames[0].toponymName}`;
                // Destination date
                document.querySelector('#destination-date').innerHTML = `${departureDate}`;
                // Destination weather
                // Destination image
            })
            .catch(error => {
                console.log("error", error);
            });
        } catch (error) {
            console.log("error", error);
        }
    });
}

//Don't forget to add preventDefault
//in interiorul functiei cream variabile pentru datele introduse de client, data si destinatia
//optional aici vom adauga si data intoarcerii si vom face variabile ce vor folosi la calcularea lungimii calatoriei intr-un js separat pe care il vom numi tripLength
//adaugam functii de validare pentru ca data intoarcerii sa fie dupa data plecarii
//adaugam functii de validare pentru ca data plecarii sa fie dupa data de astazi
//don't forget to import and export

// Export handleSubmit
export { handleSubmit };
