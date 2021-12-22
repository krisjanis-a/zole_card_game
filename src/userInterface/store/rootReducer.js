import { combineReducers } from "redux";
import Game from "./reducers/Game.reducer";
import MoveCards from "./MoveCards/MoveCards.reducer";
import Table from "./TableCards/Table.reducer";
import Players from "./Players/Players.reducer";
import SessionMode from "./SessionMode/SessionMode.reducer";

const rootReducer = combineReducers({
  SessionMode,
  Game,
  MoveCards,
  Table,
  Players,
});

export default rootReducer;
