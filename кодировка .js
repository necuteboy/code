let fs = require('fs');//переменная fs-работа с файловой системой
let arg = process.argv;//объект для работы с элементами ком строки
let inText;
let stroka='abbccc';
let k=0;
function node(letter,freq,used,father,code,freq2){
    this.letter=letter;
    this.freq=freq;
    this.used=used;
    this.father=father;
    this.code=code;
    this.freq2=freq2;
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
    let n=new node(i,alph[i],false,null,'',alph[i]);
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
    if (maxim<tree[j].freq2){
        maxim=tree[j].freq2
        ind3=j;
    }
}
// кодировка листьев в зависимости от их частоты
tree[ind3].code='0';
tree[ind3].freq2=0;
maxim=0;
for (let i=0;i<tree.length-1;i++){
    for (let k=0;k<tree.length;k++){
        if (maxim<tree[k].freq2){
            maxim=tree[k].freq2;
            ind3=k;
        }
    }
    for (j=0;j<i+1;j++){
        tree[ind3].code+='1'
    }
    tree[ind3].code+='0';
    tree[ind3].freq2=0;
    maxim=0;
}
tree[ind3].code='';
for (j=0;j<tree.length-1;j++){
    tree[ind3].code+='1';
}

// слияние двух минимумов
n=new node(tree[ind].letter+tree[ind2].letter,tree[ind].freq+tree[ind2].freq,true,1,'');
tree[ind].father=1;
tree[ind].used=true;
tree[ind2].used=true;
tree[ind2].father=1;
tree.push(n);
//составление дерева
for (i in alph){
    let mina=0,ind=0;
    for (let j=0;j<tree.length-k;j++){
        if ((tree[j].freq<mina|| mina==0) && (tree[j].used==false)){
            mina=tree[j].freq;
            ind=j
        }
    }
    if (mina==0){
        break
    }
    n=new node(tree[ind].letter+tree[tree.length-1].letter,tree[ind].freq+tree[tree.length-1].freq,true,1,'');
    console.log(mina,tree);
    tree[ind].father=1;
    tree[ind].used=true;
    tree.push(n);
    k+=1;
}
tree[tree.length-1].used=false;
tree[tree.length-1].father=null;
console.log(tree);
//кодировка листьев




