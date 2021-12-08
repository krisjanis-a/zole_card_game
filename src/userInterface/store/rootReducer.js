import { combineReducers } from "redux";
import Game from "./reducers/Game.reducer";
import MoveCards from "./reducers/MoveCards.reducer";
import Table from "./reducers/Table.reducer";
import Players from "./reducers/Players.reducer";

const rootReducer = combineReducers({
  Game,
  MoveCards,
  Table,
  Players,
});

export default rootReducer;
