'use strict';
const { generateDeck } = require('./../modules/generateDeck');


let shuffleDeck = () => {
    
    let deck = generateDeck();

    let randomNum = Math.floor(Math.random() * ((9 + 1) - 3)) + 3; // random whole num. bw. 3 and 9
    //console.log('the random number is ', randomNum);
    let theSplice = deck.splice(randomNum, randomNum); // carve out a slice bw 3 and 9 elements long, from random index pos. bw. 3 and 9
    //console.log('the splice is ', theSplice);
    deck = [...deck, ...theSplice];
    //console.log('deck after shuffle: ', deck);
    //console.log('shuffled deck length is ', deck.length);
    return deck;
}



module.exports.shuffleDeck = shuffleDeck;
