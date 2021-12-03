import { combineReducers } from "redux";
import CardReducer from "./reducers/Card.reducer";
import GameReducer from "./reducers/Game.reducer";
import MoveCardsReducer from "./reducers/MoveCards.reducer";

const rootReducer = combineReducers({
  CardReducer,
  GameReducer,
  MoveCardsReducer,
});

export default rootReducer;
