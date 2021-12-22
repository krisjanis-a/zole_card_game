import { combineReducers } from "redux";
import Game from "./reducers/Game.reducer";
import MoveCards from "./MoveCards/MoveCards.reducer";
import Table from "./TableCards/Table.reducer";
import Players from "./Players/Players.reducer";
import SessionMode from "./SessionMode/SessionMode.reducer";
import Tricks from "./Tricks/Tricks.reducer";
import DuesCollective from "./DuesCollective/DuesCollective.reducer";
import RoundPhase from "./RoundPhase/RoundPhase.reducer";
import BigStack from "./BigStack/BigStack.reducer";
import SmallStack from "./SmallStack/SmallStack.reducer";

const rootReducer = combineReducers({
  SessionMode,
  RoundPhase,
  Game,
  MoveCards,
  Tricks,
  Table,
  Players,
  DuesCollective,
  BigStack,
  SmallStack,
});

export default rootReducer;
