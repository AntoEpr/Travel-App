
    //Function to calculate days left until vacation
    export function calculateTripLength(dateIntro, dateOut) {
        const departure = new Date(dateIntro); // User's departure date
            const returnDate = new Date(dateOut)
            // Calculate the time difference in milliseconds
            const tripLength = returnDate-departure
            // Convert milliseconds to days
            const tripDuration = Math.ceil(tripLength / (1000 * 60 * 60 * 24));
            console.log(`Trip length is ${tripDuration}`)
            return tripDuration       

            }
        