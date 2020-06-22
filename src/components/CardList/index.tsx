import * as React from 'react';
interface ICardProp {
  image?: string;
  code?: string;
  images?: any;
  suit?: string;
  value?: string;
}

const CardList = (cards: any) => {
  return (
      <div>
        CardList:
          {cards.map((card) =>
            <img src={card.image} />)
          };
      </div>
  );
};

export default CardList;
