import React from 'react'
import Card from '../Card/Card'
import "./OpponentHand.scss"

const OpponentHand = ({opponentHand}) => {
    return (
        <div className="opponentHand">
    {opponentHand.map((card) => (
        <Card
          cardId={card}
          path={`../../src/assets/card-back.png`}
          key={card}
        />
      ))}
        </div>
    )
}

export default OpponentHand
