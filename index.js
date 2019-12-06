'use strict';
// Adevinta BlackJack Test
const fs = require('fs');

let round = 1;

let samsHand = [];
let dealersHand = [];

let samsHandValue = 0;
let dealersHandValue = 0;

let samsCardCodes = [];
let dealersCardCodes = [];

let suits = ['Diamonds', 'Spades', 'Hearts', 'Clubs'];
let symbols = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let deck = []; // starting deck: either read from file or generate dynamically if file is nonexistent

const deckLength = 52; // constant: 52

let shuffled = []; // shuffled deck


let fillDeck = () => {
    try{ // try to load from file 1st
        deck = JSON.parse(fs.readFileSync('./deck.json', 'utf-8'));
    }catch(e){ // if cannot load from file, generate dynamically
        console.log('error reading from file, generating deck dynamically: ' + e.message);
        generateDeck();
    }
    
    //console.log(deck);
}

let getSymbolValue = (symbol) => {
    return symbol.length === 1 ? parseInt(symbol, 10) : symbol === 'Ace' ? 11 : 10 ;
}

let generateDeck = () => {
    suits.forEach(suit => {
        symbols.forEach(symbol => {
            let cardObj = {
                "suit": suit,
                "shortSuit": suit[0],
                "symbol": symbol,
                "shortSymbol": symbol[0],
                "code": suit[0] + symbol[0],
                "value": getSymbolValue(symbol)
            }
            deck.push(cardObj);

        })
    })
    //console.log( JSON.stringify(deck) ); //generate the json file
}

let shuffleDeck = () => {

    //console.log('start deck length: ', deck.length);

    for(let i=0 ; i<(deckLength/2) ; i++){
        shuffled.push(deck.pop());
        //console.log(`pushing after pop, shuffled length is: ${shuffled.length}`);
        shuffled.push(deck.shift());
        //console.log(`pushing after shift, shuffled length is: ${shuffled.length}`);
        
    }

    //console.log('--- after op. ---');
    //console.log('start deck length: ', deck.length);
    //console.log('shuffled deck length: ', shuffled.length);
    //console.log('-----------------');
    //console.log(shuffled);
}

let whoIsWinning = () => {
    return console.log(
    round === 1 && samsHandValue === 21 ? "Sam has BlackJack in the first round! (21)" : 
    round === 1 && dealersHandValue === 22 ? "Dealer wins in the first round with 2 Aces! (22)" : 
    samsHandValue > 21 ? "Sam has lost in round " + round + " because his hand value is higher than 21: " + samsHandValue :  
    samsHandValue === 21 ? "Sam has BlackJack! (21) in round " + round : 
    dealersHandValue === 21 ? "Dealer has BlackJack! (21) in round " + round : 
    samsHandValue > dealersHandValue ? "round " + round + " Sam has higher hand: " + samsHandValue : 
    samsHandValue < dealersHandValue ? "round " + round + " Dealer has higher hand: " + dealersHandValue : 
    "Players hands equal in round " + round + ": " + samsHandValue 
    );
}

let checkSamsHand = () => {
    let valueArray = [];
    samsHand.forEach(card => {
        valueArray.push(card.value); 
    })
    samsHandValue = valueArray.reduce((acc,curr) => acc + curr);
    console.log('sams hand value is ', samsHandValue);
    
}

let checkDealersHand = () => {
    let valueArray = [];
    dealersHand.forEach(card => {
        valueArray.push(card.value); 
    })
    dealersHandValue = valueArray.reduce((acc,curr) => acc + curr);
    console.log('dealers hand value is ', dealersHandValue);
    
}

let fillSamsCardCodes = () => {
    samsHand.forEach(c => {
        !samsCardCodes.includes(c.code) ? samsCardCodes.push(c.code) : null;
    })
    console.log('sam has these cards: ', samsCardCodes);
}

let fillDealersCardCodes = () => {
    dealersHand.forEach(c => {
        !dealersCardCodes.includes(c.code) ? dealersCardCodes.push(c.code) : null;
    })
    console.log('dealer has these cards: ', dealersCardCodes);
}


let runRound = () => {

    samsHand.push(shuffled.pop());
    fillSamsCardCodes();    
    checkSamsHand();

    dealersHand.push(shuffled.pop());
    fillDealersCardCodes();
    checkDealersHand();

    whoIsWinning();
    round++;
}



// 1. fill deck
fillDeck();

// 2. shuffleDeck()
shuffleDeck();

// 3. run round(s) 2 times
//runRound();
//runRound();





