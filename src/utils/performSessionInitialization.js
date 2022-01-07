import Player from "../models/Player";
import { addPlayer } from "../store/Players/Players.action";
import { setShouldInitializeRound } from "../store/Round/Round.actions";
import { setPlayerNames } from "../store/Session/Session.action";
import { clearAllTimeouts } from "./timeoutsOperations";

const performSessionInitialization = (dispatch, playerNames) => {
  // Clear previous timeouts
  clearAllTimeouts();

  // Initialize players
  const player1 = new Player();
  const player2 = new Player();
  const player3 = new Player();

  // Set players names, seat numbers etc.
  player1.setName(playerNames[0]);
  player2.setName(playerNames[1]);
  player3.setName(playerNames[2]);

  player2.setIsComputer(true);
  player3.setIsComputer(true);

  dispatch(setPlayerNames([player1.name, player2.name, player3.name]));

  player1.setSeat(1);
  player2.setSeat(2);
  player3.setSeat(3);

  // Add players to state
  dispatch(addPlayer(player1));
  dispatch(addPlayer(player2));
  dispatch(addPlayer(player3));

  dispatch(setShouldInitializeRound(true));
};

export default performSessionInitialization;
