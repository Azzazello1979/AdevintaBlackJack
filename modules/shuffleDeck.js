'use strict';

let objArr = [
    {"key":1},
    {"key":2},
    {"key":3},
    {"key":4},
    {"key":5},
    {"key":6},
    {"key":7},
    {"key":8},
    {"key":9},
    {"key":10}
];

function shuffleDeck(){
    let randomNum = Math.floor(Math.random() * ((3 + 1) - 1)) + 1; // random whole num. bw. 1 and 3
    console.log('randomNum ', randomNum);
    console.log('objArr original ', objArr);
    let theSplice = objArr.splice(randomNum,randomNum);
    console.log('objArr after splice ', objArr);
    console.log('the splice ', theSplice);
    objArr = [...objArr, ...theSplice];
    console.log('objArr after concat ', objArr);
    console.log('objArr length after op. ', objArr.length);
}

shuffleDeck();
shuffleDeck();
shuffleDeck();
shuffleDeck();
shuffleDeck();