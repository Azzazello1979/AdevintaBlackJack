'use strict';

let objArr = [
    {"key":1},
    {"key":2},
    {"key":3},
    {"key":4},
    {"key":5},
    {"key":6}
];

function shuffleDeck(){
    let randomNum = Math.floor(Math.random() * ((3 + 1) - 1)) + 1; // random whole num. bw. 1 and 3
    console.log('randomNum ', randomNum);
    console.log('objArr original ', objArr);
    let theSplice = objArr.splice(0,randomNum);
    console.log('objArr after splice ', objArr);
    console.log('the splice ', theSplice);
    objArr = [...objArr, ...theSplice];
    console.log('objArr after concat ', objArr);
}

shuffleDeck();