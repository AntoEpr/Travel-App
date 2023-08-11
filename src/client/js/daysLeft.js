export function calculateDaysLeft(depart) {
    const now = new Date(); // Current date and time
    const departureDate = document.getElementById('date-input')
    const departure = new Date(departureDate); // User's departure date

    // Calculate the time difference in milliseconds
    const timeDifference = departure - now;

    // Convert milliseconds to days
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    console.log(`Days left until vacation: ${daysLeft}`)
    return daysLeft;
}