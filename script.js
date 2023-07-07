'use strict';
/////////////////////////////////////////////////
// BANKIST APP

// Data

//one object for each account
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements=function(movements,sort=false)
{
  containerMovements.innerHTML='';


  const movs=sort?movements.slice().sort((a,b)=>a-b):movements;
  movs.forEach(function(mov,i)
  {
    
    const type= mov> 0 ? 'deposit' : 'withdrawal';
    const html=`
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin',html); //after beginning i need to add

  });
};
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);


const createUsernames=function(accs)
{
  accs.forEach(function(acc)
  {
    //no need to return modifying acc only
    acc.username=acc.owner
      .toLowerCase()
      .split(' ')
      .map(function(name)
      {
        return name[0];
      }).join('');
  })
};
// const user="Archie Saxena";

createUsernames(accounts);
console.log(accounts);



const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcprintbalance(account1.movements);


//displaying all summary
const calcdisplaysummary=function(movements)
{
  const incomes=movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent=`${incomes}€`;


  const out=movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=`${Math.abs(out)}€`;

  const interest=movements.filter(mov=>mov>0).map(deposit=>(deposit*1.2)/100).filter((int,i,arr)=>
  {
    console.log(arr);
    return int>=1;
  })
  .reduce((acc,int)=>acc+int,0);
  labelSumInterest.textContent=`${Math.abs(interest)}€`;
};

calcdisplaysummary(account1.movements);

let currentaccount;
btnLogin.addEventListener('click',function(e)
{
  e.preventDefault();

  currentaccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
  console.log(currentaccount);

  if(currentaccount.pin===Number(inputLoginPin.value))
  {
    console.log('LOGIN');

    //displaying UI and message
    labelWelcome.textContent=`Welcome back, ${currentaccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=100;

    // inputLoginUsername=inputLoginPin='';
    inputLoginPin.blur();

    //display movements
    displayMovements(currentaccount.movements);


    //display balance
    calcDisplayBalance(currentaccount);

    //displaying summary
    // calcdisplaysummary(currentaccount.movements);
    calcDisplayBalance(currentaccount);
  }


});


btnTransfer.addEventListener('click',function(e)
{
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const recieveraccount=accounts.find(acc=>acc.username===inputTransferTo.value);
  console.log(amount,recieveraccount);

  inputTransferTo.value=inputTransferTo.value=' ';
  if(amount>0 && currentaccount.balance>=amount && recieveraccount?.username !== currentaccount.username)
  {
    console.log('transfer valid');
    currentaccount.movements.push(-amount);
    recieveraccount.movements.push(amount);

        //display movements
        displayMovements(currentaccount.movements);


        //display balance
        calcDisplayBalance(currentaccount);
    
        //displaying summary
        // calcdisplaysummary(currentaccount.movements);
        calcDisplayBalance(currentaccount);
  }

});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentaccount.username &&
    Number(inputClosePin.value) === currentaccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentaccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

//requesting loan to bank
btnLoan.addEventListener('click',function(e)
{
  e.preventDefault('');
  const amount=Number(inputLoanAmount.value);

  if(amount>0 && currentaccount.movements.some(mov=>mov>=amount*0.1))
  {
    // add movement
    currentaccount.movements.push(amount);
    //update UI

    //display movements
    displayMovements(currentaccount.movements);


    //display balance
    calcDisplayBalance(currentaccount);

    //displaying summary
    // calcdisplaysummary(currentaccount.movements);
    calcDisplayBalance(currentaccount);
  }
});


let sorted=false;
btnSort.addEventListener('click',function(e)
{
  e.preventDefault();
  displayMovements(currentaccount.movements,!(sorted));
  sorted=!sorted;
});



















/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// const arr=[1,2,3,4,5];
// console.log(arr.slice(2));
// console.log(arr.at(0));
// console.log(arr.slice(-1)[0]);

// const movements=[200,450,-400,3000,-650,-130];
// for(const it of movements)
// for(const [i,mov] of movements.entries())
// {
//   if(it>0)
//   {
//     console.log("pos");
//   }
//   else{
//     console.log("neg");
//   }
// }
// console.log("FOR EACH");
// movements.forEach(function(it)
// {
//   if(it>0)
//   {
//     console.log("pos");
//   }
//   else{
//     console.log("neg");
//   }
// });

//rather than calling f(1) f(2) f(3)
// arr.forEach(function()
// {

// })


// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function(val,key,map)
// {
//   console.log(`${key} : ${val}`);
// });


// const eurotousd=1.1;
// const movementsUSD=movements.map(function(mov)
// {
//   return mov*eurotousd;
// });

// console.log(movements);
// console.log(movementsUSD);

// const movementsusd=[];
// for(const mov of movements)
// {
//   movements.push(mov*eurotousd);
// }
// console.log(movementsusd);



const deposits=movements.filter(function(mov)
{
  return mov>0;
});
console.log(movements);

const withdrawal=movements.filter(function(mov)
{
  return mov<0;
})
console.log(withdrawal);


const eurotousd=1.1;
//PIPELINE

const totalDepositsUSD=movements
.filter(mov=>mov>0)
.map(mov=>mov*eurotousd)
.reduce((acc,mov)=>acc+mov,0)//only deposits
console.log(totalDepositsUSD);
