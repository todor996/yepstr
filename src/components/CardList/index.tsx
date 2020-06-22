import * as React from 'react';


interface ICardProp {
  image?: string;
  code?: string;
  images?: any;
  suit?: string;
  value?: string;
}

interface ICardProps extends Array<ICardProp>{}

const CardList = (cards: ICardProps) => {
  return (
      <div>
        CardList:
          {cards.map((card) =>{
            return <img src={card.image} />)
          }};
      </div>
  );
};

export default CardList;
