'use strict';
// Adevinta BlackJack Test
const fs = require('fs');

let samWon;

let samsRound = 1;
let dealersRound = 1;

let samsHand = [];
let dealersHand = [];

let samsHandValue = 0;
let dealersHandValue = 0;

let samsCardCodes = [];
let dealersCardCodes = [];

const suits = ['Diamonds', 'Spades', 'Hearts', 'Clubs'];
const symbols = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let deck = []; // starting deck: either read from file or generate dynamically if file is nonexistent



let shuffledCardsCodes = [];


let fillDeck = () => {
    try{ // try to load from file 1st
        deck = JSON.parse(fs.readFileSync('./deck.json', 'utf-8'));
    }catch(e){ // if cannot load from file, generate dynamically
        console.log('error reading from file, generating deck dynamically: ' + e.message);
        generateDeck();
    }
    
    //console.log(deck);
}

// return number
let getSymbolValue = (symbol) => {
    return symbol.length === 1 ? parseInt(symbol, 10) : 
    symbol === 'Ace' ? 11 : 
    10 ;
}

// return string
let getCodeValue = (symbol,suit) => {
    return symbol === '10' ? (suit[0] + 10).toString() : 
    (suit[0] + symbol[0]).toString() ;
}

let getShortSymbol = (symbol) => {
    return symbol === '10' ? '10' : 
    symbol[0] ;
}

let generateDeck = () => {
    suits.forEach(suit => {
        symbols.forEach(symbol => {
            let cardObj = {
                "suit": suit,
                "shortSuit": suit[0],
                "symbol": symbol,
                "shortSymbol": getShortSymbol(symbol),
                "code": getCodeValue(symbol,suit),
                "value": getSymbolValue(symbol)
            }
            deck.push(cardObj);

        })
    })
    return deck;
    //console.log( JSON.stringify(deck) ); //generate the json file
}

let shuffleDeck = () => {
    let randomNum = Math.floor(Math.random() * ((9 + 1) - 3)) + 3; // random whole num. bw. 3 and 9
    //console.log('the random number is ', randomNum);
    let theSplice = deck.splice(randomNum, randomNum); // carve out a slice bw 3 and 9 elements long, from random index pos. bw. 3 and 9
    //console.log('the splice is ', theSplice);
    deck = [...deck, ...theSplice];
    //console.log('deck after shuffle: ', deck);
    //console.log('shuffled deck length is ', deck.length);
}

let shuffle10Times = () => {
    for(let i=0 ; i<20 ; i++){
        shuffleDeck();
    }
     deck.map(c => {
        shuffledCardsCodes.push(c.code)
    })
}

let whoIsWinning = () => {
    
    if(samsRound === 2 && samsHandValue === 21){
        samWon = true;
        return console.log("Sam wins in the first 2 draws with BlackJack! (21)");
        
    }else if(dealersRound === 2 && dealersHandValue === 22){
        samWon = false;
        return console.log("Dealer wins in the first 2 draws with 2 Aces! (22)");
        
    }else if(dealersRound > 2 && samsHandValue > 21){
        samWon = false;
        return console.log("Sam has lost in round " +samsRound+ " because his hand value is higher than 21: " +samsHandValue);

    }else if(dealersRound > 2 && samsHandValue === 21){
        samWon = true;
        return console.log("Sam has BlackJack! (21) in round " +samsRound);

    }else if(dealersRound > 2 && dealersHandValue === 21){
        samWon = false;
        return console.log("Dealer has BlackJack! (21) in round " +dealersRound);

    }else if(dealersRound > 2 && dealersHandValue > 21){
        samWon = true;
        return console.log("Dealer has lost in round "+dealersRound+" because his hand value is higher than 21: " +dealersHandValue);

    }else if(samsHandValue > dealersHandValue){
        console.log(`Sam has higher hand: ${samsHandValue} than the dealer: ${dealersHandValue}`);

    }else if(samsHandValue < dealersHandValue){
        console.log(`Dealer has higher hand: ${dealersHandValue} than Sam: ${samsHandValue}`);

    }else{
        console.log("Players hands equal. " +samsHandValue);
    }

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




let samsDraw = () => {
    console.log('Sam is drawing ...');
    samsHand.push(deck.pop());
    console.log('Cards left in deck: ', deck.length);
    fillSamsCardCodes();    
    checkSamsHand();
    whoIsWinning();
    samsRound++;
    
}

let dealersDraw = () => { 
    console.log('Dealer is drawing ...');
    dealersHand.push(deck.pop());
    console.log('Cards left in deck: ', deck.length);
    fillDealersCardCodes();    
    checkDealersHand();
    whoIsWinning();
    dealersRound++;
}



// 1. fill deck
fillDeck();
// 2. shuffleDeck()
shuffle10Times();
//console.log('deck after 10 shuffles: ', shuffledCardsCodes);
//console.log('deck length after 10 shuffles: ', shuffledCardsCodes.length);

// initial 2 draws of Sam
samsDraw();
samsDraw();
console.log("Sam's initial draws are done.");
// then draw ...
if(samsHandValue >= 17){
    console.log(`Sam has to stop drawing because his hand is equal or higher than 17, it's ${samsHandValue}`); 
}else{
    do{ samsDraw(); }while(samsHandValue < 17);
}
// initial 2 draws of dealer
dealersDraw();
dealersDraw();
console.log("Dealer's initial draws are done.");
// then draw ...
if(dealersHandValue > samsHandValue){
    console.log(`Dealer has to stop drawing because his hand(${dealersHandValue}) is higher than Sam's hand(${samsHandValue}) `);
}else{
    do{ dealersDraw(); }while(dealersHandValue <= samsHandValue);
}


console.log(`
    ${ samWon ? 'sam' : 'dealer' }
    sam: ${samsCardCodes}
    dealer: ${dealersCardCodes}
`)







