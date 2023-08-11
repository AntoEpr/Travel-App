
export function checkConditions(){
    if (encodedDestination ==="" || date ==="") {
        console.log("no destination or date input")
        alert("Please enter a destination/date. Both are required.")
        return; // Stop further execution
    }
}