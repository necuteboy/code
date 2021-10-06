let fs = require('fs');//переменная fs-работа с файловой системой
let arg = process.argv;//объект для работы с элементами ком строки
let inText;
let stroka=fs.readFileSync('first.txt').toString();
let k=0;
function node(letter,freq,used,father,code){
    this.letter=letter;
    this.freq=freq;
    this.used=used;
    this.father=father;
    this.code=code;
    //this.freq2=freq2;
}
let alph=new Array();
let tree=new Array();
let i=0;

for (i=0;i<stroka.length;i++){
    alph[stroka.charAt(i)]=0;
}
for (i=0;i<stroka.length;i++){
    alph[stroka.charAt(i)]++;
}
for (i in alph){
    let n=new node(i,alph[i],false,null,'');
    tree.push(n)
}
let mina=0,premin=0,ind=0,maxim=0,ind3;
//определение самого редкого символа и предредкого символа в последовательности и самого частого
for (let j=0;j<tree.length;j++){
    if ((tree[j].freq<mina|| mina==0) && (tree[j].used==false)){
        premin=mina;
        ind2=ind
        mina=tree[j].freq;
        ind=j
    }
    else if ((tree[j].freq<premin || premin==0)&& (tree[j].used==false)){
        premin=tree[j].freq;
        ind2=j
    }
}
// слияние двух минимумов
if (premin!=0) {
    n = new node(tree[ind2].letter + tree[ind].letter, tree[ind].freq + tree[ind2].freq, true, 1, '');
    tree[ind].father = 1;
    tree[ind].used = true;
    tree[ind2].used = true;
    tree[ind2].father = 1;
    tree.push(n);

//составление дерева
    for (i in alph) {
        let mina = 0, ind = 0;
        for (let j = 0; j < tree.length - k; j++) {
            if ((tree[j].freq < mina || mina == 0) && (tree[j].used == false)) {
                mina = tree[j].freq;
                ind = j
            }
        }
        if (mina == 0) {
            break
        }
        n = new node(tree[ind].letter + tree[tree.length - 1].letter, tree[ind].freq + tree[tree.length - 1].freq, true, 1, '');
        tree[ind].father = 1;
        tree[ind].used = true;
        tree.push(n);
        k += 1;
    }
    tree[tree.length - 1].used = false;
    tree[tree.length - 1].father = null;

//кодировка листьев
    for (i = 0; i < tree[tree.length - 1].letter.length; i++) {
        for (let k = 0; k < tree.length - 1; k++) {
            if (i < 1) {
                if (tree[tree.length - 1].letter[i] == tree[k].letter) {
                    tree[k].code += '0';
                    break
                }
            } else if (i >= 1) {
                if (tree[tree.length - 1].letter[i] == tree[k].letter) {
                    let t = 0;
                    while (t < i) {
                        tree[k].code += '1';
                        t += 1;
                    }
                    if (i == tree[tree.length - 1].letter.length - 1) {
                        break
                    } else {
                        tree[k].code += '0'
                    }
                    break
                }
            }
        }
    }
}
else{
    tree[0].code='0'
}
let stroka2="";
for (i=0;i<stroka.length;i++){
    for (j=0;j<tree.length;j++){
        if (stroka[i]==tree[j].letter){
            stroka2+=tree[j].code+' ';
            break
        }
    }
}
fs.writeFileSync('second.txt', stroka2);
//раскодировка
let output=""
let stroka3=fs.readFileSync('second.txt').toString();
for (i=0;i<stroka2.length;){
    let t="";
    while (stroka2[i]!=' '){
        t+=stroka2[i];
        i++;
    }
    for (j=0;j<tree.length;j++){
        if (t==tree[j].code){
            output+=tree[j].letter;
        }
    }
    i++;
}
fs.writeFileSync('third.txt', output);




