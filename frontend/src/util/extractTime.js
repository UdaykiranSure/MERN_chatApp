export function extractTime(dateString){
    const date = new Date(dateString);
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());
    return `${hours}:${minutes}`;
}

function padNumber(number){
    return number.toString().padStart(2,"0");
}