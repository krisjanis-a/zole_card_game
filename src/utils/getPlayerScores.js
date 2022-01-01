//! DETERMINE PLAYER SCORE

// Deteremine points / score for each player depending on rules, party scores and "pules" (if not playing table)

const getPlayerScores = (
  players,
  roundResult,
  bigOneTrickCount,
  smallOnesTrickCount,
  playTable,
  playSmallZole,
  playZole,
  bigOneWinsSmallZole
) => {
  const playerScores = {};
  const bigOneScore = roundResult.bigOneScore;
  const smallOnesScore = roundResult.smallOnesScore;

  Object.values(players).forEach((player) => {
    // Normal mode not playing zole & using collective / personal dues
    if (!playTable && !playSmallZole && !playZole) {
      // Winning cases
      if (bigOneScore >= 61 && bigOneScore <= 90) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +2;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -1;
        }
      }

      // "Jaņi" for small ones
      if (bigOneScore >= 91 && smallOnesScore !== 0) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +4;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -2;
        }
      }

      // No tricks for small ones - "Bezstiķis"
      if (smallOnesTrickCount === 0) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +6;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -3;
        }
      }

      // Losing cases
      if (bigOneScore >= 31 && bigOneScore <= 60) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -4;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +2;
        }
      }
      if (bigOneScore <= 30) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -6;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +3;
        }
      }

      // No tricks for big one - "Bezstiķis"
      if (bigOneTrickCount === 0) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -8;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +4;
        }
      }
    }

    // Normal mode playing zole
    if (!playTable && !playSmallZole && playZole) {
      // Winning cases
      if (bigOneScore >= 61 && bigOneScore <= 90) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +10;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -5;
        }
      }

      // "Jaņi" for small ones
      if (bigOneScore >= 91) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +12;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -6;
        }
      }

      // No tricks for small ones - "Bezstiķis"
      if (smallOnesTrickCount === 0) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +14;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -7;
        }
      }
      // Losing cases
      if (bigOneScore >= 31 && bigOneScore <= 60) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -12;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +6;
        }
      }

      // "Jaņi" for big one
      if (bigOneScore <= 30) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -14;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +7;
        }
      }
      // No tricks for big one - "Bezstiķis"
      if (bigOneTrickCount === 0) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -16;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +8;
        }
      }
    }

    // Small Zole
    if (playSmallZole) {
      // Winning case
      if (bigOneWinsSmallZole) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = +12;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = -6;
        }
      }
      // Losing case
      if (!bigOneWinsSmallZole) {
        if (player.big) {
          const name = player.name;
          playerScores[name] = -14;
        }
        if (!player.big) {
          const name = player.name;
          playerScores[name] = +7;
        }
      }
    }
  });

  // Playing Table
  if (playTable) {
    let maxTricks = 0;
    let tableLoser;

    // Get losing player
    Object.values(players).forEach((player) => {
      const tricks = player.stack.length / 3;

      // In case two players have same amount of tricks
      if (tricks === maxTricks && tricks !== 0) {
        // Player has larger score than the current losing player
        if (
          player.stack.reduce((score, card) => score + card.value, 0) >
          players[tableLoser].stack.reduce(
            (score, card) => score + card.value,
            0
          )
        ) {
          tableLoser = player.name;
        }
      }

      if (tricks > maxTricks) {
        maxTricks = tricks;
        tableLoser = player.name;
      }
    });

    Object.values(players).forEach((player) => {
      if (player.name === tableLoser) {
        playerScores[player.name] = -4;
      }
      if (player.name !== tableLoser) {
        playerScores[player.name] = +2;
      }
    });
  }

  // console.log(playerScores);

  return playerScores;
};

export default getPlayerScores;
