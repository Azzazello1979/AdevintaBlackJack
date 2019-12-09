const { suits, symbols } = require('./constants');


let generateDeck = () => {
    let deck = [];
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


//generateDeck();
//console.log(deck.length);


module.exports.generateDeck = generateDeck;
