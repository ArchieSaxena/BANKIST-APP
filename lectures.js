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
