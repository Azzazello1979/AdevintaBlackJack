'use strict';

const { generateDeck } = require('./../modules/generateDeck');
const { shuffleDeck } = require('./../modules/shuffleDeck');

describe('generateDeck() ', () => {

    let result = generateDeck();
    let oneCardValue = result[0].value;

    it('should return 52, the length of the deck', () => {
        expect( result.length ).toBe(52);
    });

    it('should have 13 cards in the Diamonds suit', () => {
        let diamonds = [];
        result.forEach(card => {
            card.code[0] === 'D' ? diamonds.push(card) : null ;
        });
        expect( diamonds.length ).toBe(13);
    });

    it('the value property of the cardObj must be of type number', () => {
        expect( typeof oneCardValue ).toBe('number');
    });

    it('the value of any card should be less than 12', () => {
        expect( oneCardValue ).toBeLessThan(12);
    })

    it('the value of any card should be more than 1', () => {
        expect( oneCardValue ).toBeGreaterThan(1);
    })

}) 

describe('shuffleDeck() ' , () => {
    it('should return deck length of 52 after shuffle', () => {
        let shuffledDeck = shuffleDeck();
        expect( shuffledDeck.length ).toBe(52);
    })
})