import { setActivePlayer } from "../store/ActivePlayer/ActivePlayer.action";

// Active player (depending on current seat)
const selectActivePlayer = (dispatch, players, currentSeat) => {
  const player = Object.values(players).filter(
    (player) => player.seatNumber === currentSeat
  )[0];

  dispatch(setActivePlayer(player));
};

export default selectActivePlayer;
