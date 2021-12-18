const initialState = {
  sessionRunning: false, // responsible for clearing any previous session data
  initializeGame: false, // during session initialization or after each game / round
  gameRunning: false,
  // GAME PHASES
  choosingBigPhase: false,
  buryingCardsPhase: false,
  makingMovesPhase: false,
  resultsPhase: false,
  currentPhase: null,
  // GAME PHASES _END
  playZole: false,
  scoreboard: [],
  playerNames: [],
  gamesPlayed: 0,
  currentSeat: 1, // current seat that is making active choices (choosing big, burying cards, choosing move card)
  startingSeat: 1, // starting seat of current game / round; after each round moves +1 seat forward cyclically
  moveTurn: 1,
  gameMode: "SINGLE_PLAYER",
  gameScore: {},
  chooseBigTurn: null, // player who is currently given choice of being big one
  askingCard: null, // first card placed in single move
  smallStack: [], // cards collected on rounds won by small ones or in case big one plays Zole
  bigStack: [], // cards collected on rounds won by and buried by big one
  tableStack: [], // in case all players pass and decide to play "Galdiņš" i.e. Play Table, players play against table and it is possible for table to win first two rounds instead of players. This is a special game mode
  moveCount: 0,
  smallZole: false,
  playTable: false,
  // GAME MODE => must be set on session initialization
  normalMode: true, // play the game with remnants ("pules") if all players pass
  tableMode: false, // play against table if all players pass
  smallZoleMode: false, // small Zole option
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_SESSION":
      return {
        ...state,
        sessionRunning: true,
      };

    case "END_SESSION": {
      return {
        sessionRunning: false,
        initializeGame: false,
        gameRunning: false,
        choosingBigPhase: false,
        buryingCardsPhase: false,
        makingMovesPhase: false,
        resultsPhase: false,
        currentPhase: null,
        playZole: false,
        scoreboard: [],
        playerNames: [],
        gamesPlayed: 0,
        currentSeat: 1,
        startingSeat: 1,
        moveTurn: 1,
        gameMode: "SINGLE_PLAYER",
        gameScore: {},
        chooseBigTurn: null,
        askingCard: null,
        smallStack: [],
        bigStack: [],
        tableStack: [],
        moveCount: 0,
        smallZole: false,
        playTable: false,
        normalMode: true,
        tableMode: false,
        smallZoleMode: false,
      };
    }
    case "INITIALIZE_GAME":
      return {
        ...state,
        initializeGame: action.payload,
      };

    case "RESET_GAME": {
      return {
        sessionRunning: true,
        initializeGame: true,
        gameRunning: false,
        choosingBigPhase: false,
        buryingCardsPhase: false,
        makingMovesPhase: false,
        resultsPhase: false,
        currentPhase: null,
        playZole: false,
        scoreboard: state.scoreboard,
        playerNames: state.playerNames,
        gamesPlayed: state.gamesPlayed,
        currentSeat: 1,
        startingSeat: 1,
        moveTurn: 1,
        gameScore: {},
        chooseBigTurn: null,
        askingCard: null,
        smallStack: [],
        bigStack: [],
        tableStack: [],
        moveCount: 0,
        smallZole: false,
        playTable: false,
        normalMode: state.normalMode,
        tableMode: state.tableMode,
        smallZoleMode: state.smallZoleMode,
      };
    }

    case "SET_NORMAL_MODE":
      return {
        ...state,
        normalMode: action.payload,
      };
    case "SET_TABLE_MODE":
      return {
        ...state,
        tableMode: action.payload,
      };
    case "SET_SMALL_ZOLE_MODE":
      return {
        ...state,
        smallZoleMode: action.payload,
      };

    case "SET_GAME_RUNNING":
      return {
        ...state,
        gameRunning: action.payload,
      };

    case "SET_GAME_PHASE":
      return {
        ...state,
        currentPhase: action.payload,
      };

    case "SET_CHOOSING_BIG_PHASE":
      return {
        ...state,
        choosingBigPhase: action.payload,
      };

    case "SET_CHOOSE_BIG_TURN":
      return {
        ...state,
        chooseBigTurn: action.payload,
      };

    case "SET_PLAYER_NAMES":
      return {
        ...state,
        playerNames: action.payload,
      };

    case "ADD_TABLE_TO_SMALL_STACK": {
      return {
        ...state,
        smallStack: action.payload,
      };
    }

    case "ADD_CARD_TO_SMALL_STACK": {
      const newState = { ...state };
      newState.smallStack.push(action.payload);
      return newState;
    }

    case "ADD_CARD_TO_BIG_STACK": {
      const newState = { ...state };
      newState.bigStack.push(action.payload);
      return newState;
    }

    case "SET_BURYING_PHASE":
      return {
        ...state,
        buryingCardsPhase: action.payload,
      };

    case "SET_MAKING_MOVES_PHASE":
      return {
        ...state,
        makingMovesPhase: action.payload,
      };

    case "NEXT_SEAT": {
      let nextSeat = state.currentSeat + 1;
      if (nextSeat === 4) {
        nextSeat = 1;
      }

      return {
        ...state,
        currentSeat: nextSeat,
      };
    }

    case "NEXT_MOVE_TURN": {
      let nextMoveTurn = state.moveTurn + 1;
      if (nextMoveTurn === 4) {
        nextMoveTurn = 1;
      }
      return { ...state, moveTurn: nextMoveTurn };
    }
    case "SET_CURRENT_SEAT_TO_STARTING_SEAT":
      return {
        ...state,
        currentSeat: state.startingSeat,
      };

    case "SET_CURRENT_SEAT":
      return {
        ...state,
        currentSeat: action.payload,
      };

    case "NEXT_STARTING_SEAT":
      const nextStartingSeat = state.startingSeat++;

      return {
        ...state,
        startingSeat: nextStartingSeat,
      };

    case "SET_ASKING_CARD":
      return {
        ...state,
        askingCard: action.payload,
      };

    case "ADD_MOVE_COUNT":
      const newMoveCount = state.moveCount + 1;
      return {
        ...state,
        moveCount: newMoveCount,
      };

    case "RESET_MOVE_COUNT":
      return {
        ...state,
        moveCount: 0,
      };

    case "SET_RESULTS_PHASE":
      return {
        ...state,
        resultsPhase: action.payload,
      };

    case "SET_GAME_RESULT":
      return {
        ...state,
        gameScore: action.payload,
      };

    case "ADD_GAME_RESULT_TO_SCOREBOARD":
      return state;

    default:
      return state;
  }
};
