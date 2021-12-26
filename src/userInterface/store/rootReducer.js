import { combineReducers } from "redux";
import Table from "./TableCards/Table.reducer";
import Players from "./Players/Players.reducer";
import SessionMode from "./SessionMode/SessionMode.reducer";
import Session from "./Session/Session.reducer";
import Tricks from "./Tricks/Tricks.reducer";
import DuesCollective from "./DuesCollective/DuesCollective.reducer";
import DuesPersonal from "./DuesPersonal/DuesPersonal.reducer";
import Round from "./Round/Round.reducer";
import RoundPhase from "./RoundPhase/RoundPhase.reducer";
import RoundResult from "./RoundResult/RoundResult.reducer";
import RoundType from "./RoundType/RoundType.reducer";
import Move from "./Move/Move.reducer";
import MoveCards from "./MoveCards/MoveCards.reducer";
import BigStack from "./BigStack/BigStack.reducer";
import SmallStack from "./SmallStack/SmallStack.reducer";
import TableStack from "./TableStack/TableStack.reducer";
import Scoreboard from "./Scoreboard/Scoreboard.reducer";
import ActivePlayer from "./ActivePlayer/ActivePlayer.reducer";

const rootReducer = combineReducers({
  ActivePlayer,
  SessionMode,
  Session,
  Round,
  RoundPhase,
  RoundResult,
  RoundType,
  Move,
  MoveCards,
  Tricks,
  Table,
  Players,
  DuesCollective,
  DuesPersonal,
  BigStack,
  SmallStack,
  TableStack,
  Scoreboard,
});

export default rootReducer;
