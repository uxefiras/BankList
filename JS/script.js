'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Firas Faraj',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 4499,
};

const account2 = {
  owner: 'Ahmed Ali',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Khaled Ahmed',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'William Wallas',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 1,
};
const nameUser = 'firas faraj';
const newName = nameUser.split(' ')[0];
console.log(newName);
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
nameSplliter(accounts);

let cashValue = 0;
let userData;

//Provide Event Listeners
btnLogin.addEventListener('click', userValidation);
btnTransfer.addEventListener('click', moneyTransfer);
/* btnLoan.addEventListener('click'); */

//Provide app functionlity

function userValidation(e) {
  e.preventDefault();
  containerMovements.innerHTML = '';
  const userName = inputLoginUsername.value;
  const userPIN = inputLoginPin.value;
  userData = accounts.find(
    userValidate => userValidate.name === userName.toLowerCase()
  );

  if (userData?.pin === Number(userPIN)) {
    labelWelcome.innerText = `Wlecome Back, ${userData.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;
    updateUI(userData);
  }
}

function moneyTransfer(e) {
  e.preventDefault();
  const amountOfTransfer = Number(inputTransferAmount.value);
  const userYouWantToTransferTo = accounts.find(
    user => user.name === inputTransferTo.value
  );
  nputTransferTo.value = amountOfTransfer.value = '';
  if (userYouWantToTransferTo && userData?.cashValue > 0) {
    userData.movements.push(-amountOfTransfer);
    userYouWantToTransferTo.movements.push(amountOfTransfer);
    updateUI(userData);
  }
}

function cashTottal(data) {
  data.cashValue = userData.movements.reduce((acc, cur) => acc + cur);
  labelBalance.innerText = `${data.cashValue}€`;
}

// Providing reduce and filter to create a calulater function
function calculateTransfersDisplayer(data) {
  const sumIncomes = data
    .filter(inData => inData > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const sumOutcomes = data
    ?.filter(inData => inData < 0)
    ?.reduce((acc, cur) => acc + cur, 0);
  const sumOutcomesCheker = sumOutcomes === 0 ? '0000' : sumOutcomes;
  const bankInterest = data
    .filter(inData => inData > 0)
    .map(deposite => (deposite * 1.2) / 100)
    .filter(intrest => intrest >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.innerText = `${sumIncomes}€`;
  labelSumOut.innerText = `${Math.abs(sumOutcomesCheker)}€`;
  labelSumInterest.innerText = `${bankInterest}€`;
}

function updateUI(data) {
  calculateTransfersDisplayer(data.movements);
  displayData(data);
  cashTottal(data);
}

function displayData(data) {
  data.movements.forEach(function (cash, index) {
    let type = cash > 0 ? 'deposit' : 'withdrawal';
    const htmlData = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${cash}€</div>
        </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', htmlData);
  });
}

function nameSplliter(obj) {
  obj.forEach(function (data) {
    data.name = data.owner
      .split(' ')
      .map(name => name[0])
      .join('')
      .toLowerCase();
  });
}
