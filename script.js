const balance = document.getElementById(
    "balance"
);


const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


let transactions = [];
//add transaction
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim()=== "" || amount.value.trim()===""){
              alert("please enter Text and value");
        }
        else{
            const transaction ={
                id:generateID(),
                text:text.value,
                amount: +amount.value,
            };
            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateValues();
            text.value ="";
            amount.value = "";
        }
    
}
//generate id
function generateID(){
    return Math.floor(Math.random()*100000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0?"-":"+";
    const item =document.createElement("li");

    item.classList.add(

        transaction.amount< 0 ?"minus":"plus"

    )
    item.innerHTML =`
          ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}
          </span>
          <button class ="delete_btn" onclick="">x</button>
    `;
    list.appendChild(item);
}
addTransactionDOM(transactions);
//Update updateValues
function updateValues() {
    const amounts = transactions.map((transaction)=>transaction.amount);
    const total = amounts.reduce((acc,item)=>(acc += item),0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc,item)=>(acc += item),0).toFixed(2);
    const expense = (amounts.filter((item)=>item < 0).reduce((acc,item) => (acc += item),0)*-1).toFixed(2);
    balance.innerText=` $ ${total}`;
    money_plus.innerText = `$ ${income}`;
    money_minus.innerText =`$ ${expense}`;
}
//Init app
function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
Init();
form.addEventListener("submit", addTransaction);