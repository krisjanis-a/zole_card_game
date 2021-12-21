import { combineReducers } from "redux";
import Game from "./reducers/Game.reducer";
import MoveCards from "./MoveCards/MoveCards.reducer";
import Table from "./TableCards/Table.reducer";
import Players from "./Players/Players.reducer";

const rootReducer = combineReducers({
  Game,
  MoveCards,
  Table,
  Players,
});

export default rootReducer;
