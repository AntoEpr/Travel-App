
    //Function to calculate days left until vacation
export function calculateDaysLeft(dateIntro) {
    console.log(`I am dateIntro= ${dateIntro}`)
        const now = new Date(); // Current date and time
        const departure = new Date(dateIntro); // User's departure date
        // Calculate the time difference in milliseconds
        const timeDifference = departure - now;
        // Convert milliseconds to days
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        console.log(`Days left until vacation: ${daysLeft}`)   
        return daysLeft         
        //If contidion to choose weather 
        }
    
    