import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';

const App: FunctionComponent = () => {

    const [cardCount, setCardCount] = useState(0);
    const [fetch, setFetch] = useState(false);
    const [deck, setDeck] = useState({id: null, cards: [], remaining: 52});
    const [result, setResult] = useState(false);
    const [guess, setGuess] = useState(null);
    const [correctGuess, setCorrectGuess] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFetch(!fetch);
    };

    const handleOnChange = (e: any) => {
        setGuess(e.target.value);
    };

    useEffect(() => {
        const fetchDecks = async () => {
                const {
                    data,
                } = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                setDeck({
                    ...deck,
                    id: data.deck_id,
                    remaining: data.remaining,
                });
        };
        fetchDecks();
    }, []);

    useEffect(() => {
        const next = async () => {
            const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`);
            setResult(guess.toLowerCase() === data.cards[0].code.toLowerCase());
            console.log(guess.toLowerCase(), data.cards[0].code.toLowerCase());
            if (guess.toLowerCase() === data.cards[0].code.toLowerCase()) {
                setCorrectGuess(correctGuess + 1);
            }
            setDeck({
                ...deck,
                remaining: data.remaining,
                cards: [...deck.cards, data.cards[0]],
            });
            setCardCount(cardCount + 1);
        };
        next();
    }, [fetch]);
    return (
        <div>
            <div>
                <input type='text' onChange={handleOnChange}/>
                <button onClick={handleSubmit}>Guess next </button>
            </div>
            <div>
                Card count: {cardCount}
            </div>
            <div>
                Correct guesses: {correctGuess}
            </div>
            <div>
                Last guess result: {result.toString()}
            </div>
        </div>
    );
};

export default App;
