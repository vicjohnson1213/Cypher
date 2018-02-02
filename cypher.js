const quote = require('random-quote');
const strip = require('striptags');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
const shuffled = shuffle(chars);
let key = generateKey(chars, shuffled);

quote()
    .then((q) => {
        console.log(replace(entities.decode(strip(q[0].content)).toLowerCase(), key));
    })
    .catch((err) => {
        console.log(err);
    });

function replace(text, key) {
    let cypher = '';

    for (let i = 0; i < text.length; i++) {
        cypher += key[text.charAt(i)] || text.charAt(i);
    }

    return cypher;
}

function generateKey(chars, shuffled) {
    let key = {};
    chars.forEach((char, idx) => {
        key[char] = shuffled[idx];
    });

    return key;
}

function shuffle(list) {
    let randomized = [];
    let array = list.slice(0);

    while ( array.length !== 0) {
        let rIndex = Math.floor(array.length * Math.random());
        randomized.push(array[rIndex]);
        array.splice(rIndex, 1)
    }
    return randomized;
}
