// Data
import Cards from "../data/Cards";
// Functions
import createDeck from "./createDeck";
import dealCards from "./dealCards";
import cardIdToCard from "./cardIdToCard";

// Actions
import { setPlayerHand } from "../store/Players/Players.action";
import { setTable } from "../store/TableCards/Table.action";
import {
  setChooseBigTurn,
  setCurrentSeatToStartingSeat,
  setRoundRunning,
  setShouldInitializeRound,
} from "../store/Round/Round.actions";
import { setChoosingBigPhase } from "../store/RoundPhase/RoundPhase.action";

const performRoundInitialization = (
  dispatch,
  players,
  startingSeat,
  chooseBigTurn
) => {
  if (Object.values(players).length > 0) {
    // Deal cards
    const deck = createDeck(Cards);
    const hands = dealCards(deck, 3);

    // Set player hands in state
    const playersArr = Object.entries(players);

    for (let i = 0; i < playersArr.length; i++) {
      const playerName = playersArr[i][1].name;
      const hand = hands[i].map((id) => cardIdToCard(id));

      dispatch(setPlayerHand(playerName, hand));
    }

    // Set table
    dispatch(setTable(hands[3].map((id) => cardIdToCard(id))));

    // Finalize round setup
    dispatch(setShouldInitializeRound(false));
    dispatch(setRoundRunning(true));
    dispatch(setChoosingBigPhase(true));
    dispatch(setCurrentSeatToStartingSeat(startingSeat));

    if (!chooseBigTurn) {
      dispatch(setChooseBigTurn(1));
    }
  }
};

export default performRoundInitialization;
