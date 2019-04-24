/*---------- Query Selectors -----------*/
/*---------- Input Var.      -----------*/
var inputRangeMin = document.querySelector('#input-minrange');
$()

var inputRangeMax = document.querySelector('#input-maxrange');
var inputNameCh1 = document.querySelector('#input-name-challenger1');
var inputNameCh2 = document.querySelector('#input-name-challenger2');
var inputGuessCh1 = document.querySelector('#input-guess-challenger1');
var inputGuessCh2 = document.querySelector('#input-guess-challenger2');
var inputAll = document.querySelectorAll('input');
/*--------- Output Var -----------------*/
var outputRangeMin = document.querySelector('#range-min');
var outputRangeMax = document.querySelector('#range-max');
var outputNameCh1 = document.querySelector('#name-output-challenger1');
var outputNameCh2 = document.querySelector('#name-output-challenger2');
var outputGuessCh1 = document.querySelector('#guess-output-challenger1');
var outputGuessCh2 = document.querySelector('#guess-output-challenger2');
var outputHighLow1 = document.querySelector('#guess-output-high-low1');
var outputHighLow2 = document.querySelector('#guess-output-high-low2');
/*--------- Buttons --------------------*/
var btnUpdateRange = document.querySelector('#btn-update');
var btnSubmit = document.querySelector('#btn-submit');
var btnReset = document.querySelector('#btn-reset');
var btnClear = document.querySelector('#btn-clear');
var btnAll = document.querySelector('button');
var btnHideCard = document.querySelector('.fa-times-circle');
/*---------- HTML Elements -------------*/
var asideColumn = document.querySelector('aside');
var formUpdateRange = document.querySelector('#form-range');
var formChallenger = document.querySelector('#form-challenger');
var winnerCard =  document.querySelector('section');

var error = document.querySelector('.hidden-error');
var errorName1 = document.querySelector('#name-error-1');
var errorName2 = document.querySelector('#name-error-2');
var errorGuess1 = document.querySelector('#guess-error-1');
var errorGuess2 = document.querySelector('#guess-error-2');
var errorInputMin = document.querySelector('#range-error-min');
var errorInputMax = document.querySelector('#range-error-max');
/*---------- Global Variables ----------*/
var outputWinner;
let minNumber = parseInt(inputRangeMin.value) || 1;
let maxNumber = parseInt(inputRangeMax.value) || 100;
let timer = 0;
var guessCounter = 1;

/*---------- Event Listeners -----------*/
/*---------- Buttons -------------------*/
btnUpdateRange.addEventListener('click', validateInputRange);
btnSubmit.addEventListener('click', minMaxGuessValidation);
btnClear.addEventListener('click', resetChallengerForm);
btnReset.addEventListener('click', resetGame);
asideColumn.addEventListener('click', deleteCard);
/*---------- Input Names ---------------*/
inputRangeMin.addEventListener('keydown', toggleDisabledBtnUpdate);
inputRangeMin.addEventListener('keydown', validateRange);

inputRangeMax.addEventListener('keydown', toggleDisabledBtnUpdate);
inputRangeMax.addEventListener('keydown', validateRange);

inputNameCh1.addEventListener('input', validateCh1Name);
inputNameCh1.addEventListener('keyup', toggleDisabledBtnSubmit);
inputNameCh1.addEventListener('keydown', validateForAlphaNumeric);
inputNameCh1.addEventListener('input', toggleDisabledClear);

inputNameCh2.addEventListener('input', validateCh2Name);
inputNameCh2.addEventListener('keyup', toggleDisabledBtnSubmit);
inputNameCh2.addEventListener('keydown', validateForAlphaNumeric);
inputNameCh2.addEventListener('input', toggleDisabledClear);
/*---------- Input Guesses -------------*/
inputGuessCh1.addEventListener('input', validateCh1Guess);
inputGuessCh1.addEventListener('keyup', toggleDisabledBtnSubmit);
inputGuessCh1.addEventListener('keyup', toggleDisabledClear);
inputGuessCh1.addEventListener('keydown', validateRange);

inputGuessCh2.addEventListener('input', validateCh2Guess);
inputGuessCh2.addEventListener('keyup', toggleDisabledBtnSubmit);
inputGuessCh2.addEventListener('keyup', toggleDisabledClear);
inputGuessCh2.addEventListener('keydown', validateRange);

/*---------- Functions -----------------*/

function makeRandomNumber() {
    if(minNumber<=0){
    minNumber = 1;
  }
  randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  console.log(randomNum);
};



function toggleDisabledBtnUpdate() {
   if (inputRangeMin && inputRangeMax !='') {
    btnUpdateRange.removeAttribute('disabled');
  } else {
    btnUpdateRange.setAttribute('disabled', 'disabled');
   }
};

function toggleDisabledBtnSubmit() {
   if (inputGuessCh1.value && inputGuessCh2.value && inputNameCh1.value && inputNameCh2.value !='') {
    btnSubmit.removeAttribute('disabled');
  } else {
    btnSubmit.setAttribute('disabled', 'disabled');

  }
};


function toggleDisabledClear() {
  if (inputNameCh1.value !='' || inputNameCh2.value != '') {
    btnClear.removeAttribute('disabled');
  }
  if(inputGuessCh1 != '' || inputGuessCh2.value != '') {
    btnClear.removeAttribute('disabled');
  }
  if (inputGuessCh1 == ''|| inputGuessCh2 =='') {
    btnClear.setAttribute('disabled', 'disabled');
  }
};

function validateRange(e) {
  var regexCharNum = /[\d\t\r]/;
  if (e.key === 'Backspace' || regexCharNum.test(e.key)){
  } else {
    e.preventDefault();
  }
};

function validateForAlphaNumeric(e) {
  var regexChar = /[\w\t\n\r]/;
  if (e.key === 'Backspace' || regexChar.test(e.key)){
  } else {
    e.preventDefault();
  }
};

function validateCh1Name() {
  if(inputNameCh1.value == '') {
    inputNameCh1.classList.add('error')
    errorName1.style.display = 'block';
  } else {
    inputNameCh1.classList.remove('error');
    errorName1.style.display=  'none';
  }
};

function validateCh2Name() {
  if(inputNameCh2.value == ''){
    inputNameCh2.classList.add('error');
    errorName2.style.display = 'block';
  } else {
    inputNameCh2.classList.remove('error');
    errorName2.style.display = 'none';
  }
};

function validateCh1Guess(){
  if(inputGuessCh1.value == '') {
    inputGuessCh1.classList.add('error');
    errorGuess1.style.display= 'block';
  } else {
    inputGuessCh1.classList.remove('error');
    errorGuess1.style.display = 'none';
  } 
};

function validateCh2Guess() {
  if(inputGuessCh2.value == '') {
    inputGuessCh2.classList.add('error');
    errorGuess2.style.display = 'block';
  } else {
    inputGuessCh2.classList.remove('error');
    errorGuess2.style.display = 'none';
  }
};

function validateAllInputs() {
  validateCh1Guess();
  validateCh2Guess();
  validateCh1Name();
  validateCh2Name();
};

function validateInputRange(e) {
  e.preventDefault();
  if (inputRangeMin.value > inputRangeMax.value) {
    addRangeError();
    return;
    } else if (inputRangeMin.value < inputRangeMax.value) {
    removeRangeError();
    updateRange();
  }
};

function addRangeError() {
  inputRangeMin.classList.add('error');
  inputRangeMax.classList.add('error');
  errorInputMin.style.display = 'block';
  errorInputMax.style.display = 'block';
  btnUpdateRange.style['align-self'] = 'center';
};

function removeRangeError() {
  inputRangeMax.classList.remove('error');
  errorInputMax.style.display = 'none';
  inputRangeMin.classList.remove('error');
  errorInputMin.style.display = 'none';
  btnUpdateRange.style['align-self'] = 'flex-end';
}

function updateRange() {
  minNumber = parseInt(inputRangeMin.value) || 1;
  maxNumber = parseInt(inputRangeMax.value) || 100;
  makeRandomNumber();
  changeDOMRange();
  formUpdateRange.reset();
};

function changeDOMRange() {
  outputRangeMin.innerText = minNumber;
  outputRangeMax.innerText = maxNumber;
};

function checkGuess(inputGuess) {
  let outputHighLow = outputHighLow1;
  let inputName = inputNameCh1;
  if(inputGuess.id === inputGuessCh2.id){
    outputHighLow = outputHighLow2;
    inputName = inputNameCh2;
  } 
  if(inputGuess.value == randomNum) { 
    winner(outputHighLow, inputName)
  } else if (inputGuess.value < randomNum) {
    tooLow(outputHighLow)
  } else { 
    tooHigh(outputHighLow);
  }
};

function tooLow(outputHighLow) {
  outputHighLow.innerText = 'that\'s too low';
  guessCounter++;
};

function tooHigh(outputHighLow) {
    outputHighLow.innerText = 'that\'s too high';
    guessCounter ++;
};

function winner(outputHighLow, inputName) {
  outputWinner = inputName.value;
  outputHighLow.innerText = 'BOOM';
  increaseDifficulty();
  appendCard();
  guessCounter = 0;
  btnReset.removeAttribute('disabled')
}


function resetChallengerForm(e){
  e.preventDefault();
  formChallenger.reset();
  btnClear.setAttribute ('disabled','disabled') 
};

function resetGame (e){
  e.preventDefault()
  formChallenger.reset()
  minNumber = 1;
  maxNumber = 100;
  changeDOMRange();
  makeRandomNumber()
  displayNames() 
  btnReset.setAttribute('disabled','disabled')
  btnClear.setAttribute('disabled','disabled')
  btnSubmit.setAttribute('disabled','disabled')
}

function minMaxGuessValidation(e){
  e.preventDefault()
  if(inputGuessCh1.value > maxNumber || inputGuessCh1.value < minNumber) {
    addGuessErrors()
  } else if(inputGuessCh1.value < minNumber || inputGuessCh2.value < minNumber){
    addGuessErrors()
  }else{
    removeGuessErrors();
    playGame()
  }
}

function addGuessErrors(){
  inputGuessCh1.classList.add('error');
  inputGuessCh2.classList.add('error');
  inputNameCh1.classList.add('error');
  inputNameCh2.classList.add('error');
  errorGuess1.style.display = 'block';
  errorGuess2.style.display = 'block';
  errorName1.style.display = 'block';
  errorName2.style.display = 'block';
}

function removeGuessErrors(){
  inputGuessCh1.classList.remove('error');
  inputGuessCh2.classList.remove('error');
  inputNameCh1.classList.remove('error');
  inputNameCh2.classList.remove('error');
  errorGuess1.style.display = 'none';
  errorGuess2.style.display = 'none';
  errorName1.style.display = 'none';
  errorName2.style.display = 'none';
}


function playGame() {
  displayNames();
  checkGuess(inputGuessCh1);
  checkGuess(inputGuessCh2);
  validateAllInputs();
} 

function displayNames(){
  outputNameCh1.innerText = inputNameCh1.value || 'Challenger 1 Name';
  outputGuessCh1.innerText = inputGuessCh1.value || '--';
  outputNameCh2.innerText = inputNameCh2.value || 'Challenger 2 Name';
  outputGuessCh2.innerText = inputGuessCh2.value || '--';
}

function appendCard(){
  asideColumn.innerHTML += `<section class="card-winner">
      <div class="versus-challenger">
        <p class="card-output-ch1">${inputNameCh1.value || `Challenger 1`}</p>
        <p class="vs-style">VS</p>
        <p class="card-output-ch2">${inputNameCh2.value || `Challenger 2`}</p>
      </div>
      <hr>
      <div class="card-output-results">
          <h2 class="winner">${outputWinner || 'Challenger'}</h2>
          <p class="card-style-winner">Winner</p>
      </div>
      <hr>
      <div class="card-bottom-wrapper">
        <p><span class="card-num-guess">${guessCounter} </span>Guesses</p>
        <p><span class="card-min">${timer}</span> seconds</p>
        <i class="fas fa-times-circle delete"></i>
      </div>
    </section>`
  makeRandomNumber();
  resetTimer();
}

function resetTimer(){
  clearInterval(timer)
  timer = 0;
}

function increaseDifficulty(){
  minNumber = minNumber -10;
  maxNumber = maxNumber +10;
  if (minNumber <= 0){
    outputRangeMin.innerText = 1;
    outputRangeMax.innerText = maxNumber;
  }else{
  outputRangeMin.innerText = minNumber;
  outputRangeMax.innerText = maxNumber;
  }
}

function deleteCard(e){
  if (e.target.classList.contains('delete')){
    e.target.closest('section').remove();
  }
}

function startClock(){
  setInterval(()=>timer++, 1000)
}

window.onload = makeRandomNumber();
window.onload = startClock();