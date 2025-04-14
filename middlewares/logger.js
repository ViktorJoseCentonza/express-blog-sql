

function checkTime(req, res, next) {

    // se l'ora è dopo le 22:00 e prima delle 7:00
    // rispondiamo con un messaggio di errore
    const currHour = new Date().getHours();
    if (currHour >= 22 || currHour < 7) {
        console.log("è notte!");
    } else if (currHour <= 22 || currHour > 7) {
        console.log("è giorno!");
    }
    next();
}

module.exports = checkTime