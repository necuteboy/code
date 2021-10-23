let fs = require("fs");
let arg = process.argv;
let stroka = fs.readFileSync(arg[2]);
stroka = stroka.toString();
function node(letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}
let alph = new Array();
for (let i = 0; i < stroka.length; i++) {
    alph[stroka.charAt(i)] = 0;
}
for (let i = 0; i < stroka.length; i++) {
    alph[stroka.charAt(i)] += 1;
}
let tree = new Array();
for (q in alph) {
    let n = new node(q, alph[q], false, null, '');
    tree.push(n);
}
wavelong = tree.length;
for (let i = 0; i < wavelong - 1; i++) {
    let ind1;
    let ind2;
    let mina = stroka.length;
    for (let j = 0; j < tree.length; j++) {
        if (mina > tree[j].freq && !tree[j].used) {
            mina = tree[j].freq;
            ind1 = j;
        }
    }
    tree[ind1].code = '0';
    tree[ind1].used = true;
    tree[ind1].father = tree.length;
    let mina2 = stroka.length;
    for (let i = 0; i < tree.length; i++) {
        if (mina2 > tree[i].freq && !tree[i].used) {
            mina2 = tree[i].freq;
            ind2 = i;
        }
    }
    tree[ind2].code = '1';
    tree[ind2].used = true;
    tree[ind2].father = tree.length;
    let n = new node(tree[ind1].letter + tree[ind2].letter, tree[ind1].freq + tree[ind2].freq, false, null, '')
    tree.push(n);
}
let leaves = [];
for (let i = 0; i < wavelong; i++) {
    let temp = i;
    leaves[tree[temp].letter] = '';
    while (tree[temp].father != null) {
        leaves[tree[i].letter] = tree[temp].code + leaves[tree[i].letter];
        temp = tree[temp].father;

    }
}
let stroka2 = '';
for (let i = 0; i < wavelong; i++) {
    let j = stroka[i];
    stroka2 += leaves[j];
}
fs.writeFileSync(arg[3],stroka2);




