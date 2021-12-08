const initialState = {
    sessionRunning = Boolean,
    scoreboard = Array,
    playerNames = Array,
    gamesPlayed = Number,
    currentSeat = Number,
    gameMode = String,
    gameScore = Object
}

export default (state = initialState, action) => {
    switch (action.type) {

    case "INITIALIZE_SESSION":
        return {
            sessionRunning = true,
            scoreboard = [],
            playerNames = [],

        }

    default:
        return state
    }
}
