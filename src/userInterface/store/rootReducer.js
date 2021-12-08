import { combineReducers } from "redux";
import MoveCards from "./reducers/MoveCards.reducer";
import Table from "./reducers/Table.reducer";
import Players from "./reducers/Players.reducer";

const rootReducer = combineReducers({
  MoveCards,
  Table,
  Players,
});

export default rootReducer;
