/*---------- Query Selectors -----------*/

var inputIdeaTitle = document.querySelector('#idea-title-input');
var inputIdeaBody = document.querySelector('#idea-body-input');
var inputNewQuality = document.querySelector('#custom-quality-input');

var inputSearch = document.querySelector('#idea-search-input');

var btnShowStarIdeas = document.querySelector('#show-starred-ideas');
var btnNewQuality = document.querySelector('#add-new-quality');
var btnSaveIdea = document.querySelector('#idea-btn-save');
var btnShow = document.querySelector('#show-button');
var btnHamburger = document.querySelector('#hamburger-menu')
var btnAddNewQual = document.querySelector('#add-new-quality');

var iconCardStar = document.querySelector('.card-top-icon-favorite');
var iconCardClose = document.querySelector('.card-top-icon-close');
var iconCardUpvote = document.querySelector('.card-bottom-icon-upvote');
var iconCardDownvote = document.querySelector('.card-bottom-icon-downvote');

var qualListContainer = document.querySelector('ul')

var cardsArea = document.querySelector('main');
var cardTemplate = document.querySelector('template'); 
var cardQuality = document.querySelector('.card-bottom-quality');
var noIdeaDisplay = document.querySelector('.main-no-idea-display');

var navMenu = document.querySelector('.aside-article');
var counter = 3;
var noStarDisplay = document.querySelector('.main-no-star-message');
var qualitiesButtons = document.getElementsByTagName('li');
var ideas = JSON.parse(localStorage.getItem('idea-card')) || [];
var qualities = ['Swill', 'Plausible', 'Genius'];

/*---------- Event Listeners -----------*/

inputSearch.addEventListener('input', searchIdeas);
inputIdeaTitle.addEventListener('input', toggleSaveBtn);
inputIdeaBody.addEventListener('input', toggleSaveBtn);
btnSaveIdea.addEventListener('click', onSaveBtnPress);
btnShow.addEventListener('click', toggleMoreIdeas)
btnAddNewQual.addEventListener('click', createNewQuality);
window.addEventListener('load', startIdeaBox);
btnShowStarIdeas.addEventListener('click', showStars);
btnHamburger.addEventListener('click', hamburglar);

/*---------- Functions -----------------*/

function startIdeaBox(e) {
  retrieveMethods(ideas);
  divideIdeas();
  hideEmptyMessage();
  addLiEvents();
}


function retrieveMethods(oldIdeas) {
  ideas = [];
  for (i = 0; i < oldIdeas.length; i++) {
    var newIdea = new Idea(oldIdeas[i].id, oldIdeas[i].title, oldIdeas[i].body, oldIdeas[i].star, oldIdeas[i].quality);
    ideas.push(newIdea);
  }
}

function hideEmptyMessage() {
  if (ideas.length != 0) {
    noIdeaDisplay.classList.add('hidden');
  } 
  else {
    noIdeaDisplay.classList.remove('hidden');   
  }
}

function addLiEvents() {
  for (var i = 0; i < qualitiesButtons.length; ++i) {
    qualitiesButtons[i].addEventListener('click', filterByQuality);
  }
}

function filterByQuality(e) {
  let qualValue = parseInt(e.target.value);
  let filterResults = ideas.filter(idea => idea.quality === qualValue);
  cardsArea.innerHTML = '';
  filterResults.forEach(idea => addCardToDOM(idea));
}

function showStars() {
  if(btnShowStarIdeas.innerText === 'Show Starred Ideas'){
    btnShowStarIdeas.innerText = 'Show All Ideas';
    var filterResults = ideas.filter(idea => idea.star === true)
  }else{
    btnShowStarIdeas.innerText = 'Show Starred Ideas';
    var filterResults = ideas.filter(idea => idea.star === idea.star)
  }
  cardsArea.innerHTML = '';
  filterResults.forEach(idea => addCardToDOM(idea));
}

function searchIdeas(e) {
  var searchQuery = inputSearch.value.toLowerCase();
  var searchResults = ideas.filter(card => card.title.toLowerCase().includes(searchQuery) || card.body.toLowerCase().includes(searchQuery));
  cardsArea.innerHTML = '';
  searchResults.forEach(card => addCardToDOM(card));
}

function hamburglar(e) {
  e.target.classList.toggle('menu-toggle')
  if(e.target.classList.contains('menu-toggle')){
    e.target.setAttribute('src', 'images/menu-close.svg')
    navMenu.style.display = 'block'
  } else {
    e.target.setAttribute('src', 'images/menu.svg')
    navMenu.style.display = 'none';
  } 
}

function onSaveBtnPress(e){
  e.preventDefault();
  createNewIdea();
  toggleSaveBtn();
  hideEmptyMessage();
}

function createNewQuality(e) {
  e.preventDefault();
  var inputNewQuality = document.querySelector("#custom-quality-input");
  if (inputNewQuality.value) {
    qualListContainer.innerHTML += `<li value="${counter++}" id="quality-select-${counter}">${
      inputNewQuality.value
    }</li>`;
    addLiEvents();
  }
  inputNewQuality.value = "";
}

function createNewIdea() {
  var newIdea = new Idea(Date.now(), inputIdeaTitle.value, inputIdeaBody.value);
  addCardToDOM(newIdea);
  ideas.push(newIdea);
  newIdea.saveToStorage(ideas);
  clearCardForms();
  var cardBody = document.querySelectorAll('.card-body');
}

function clearCardForms() {
  document.querySelector(".card-add-form").reset();
}

function enterKeyPress(e){
  if(e.key === 'Enter'){
  e.target.blur();
  }
}

function addCardToDOM(idea) {
  var cardClone = cardTemplate.content.cloneNode(true);
  var cardQuery = cardClone.querySelector('.card');
  var qualityName = qualities[idea.quality];
  cloneQueries(cardClone, qualityName, idea);
  cardQuery.addEventListener('click', cardActions);
  cardQuery.addEventListener('input', editText);
  cardsArea.insertBefore(cardClone, cardsArea.firstChild);
  khalidify()
}

function cloneQueries(cardClone, qualityName, idea) {
  cardClone.querySelector('.card').dataset.id = idea.id;
  cardClone.querySelector('.card-title').innerText = idea.title || 'Idea Title';
  cardClone.querySelector('.card-body').innerText = idea.body || 'Lorem Ipsum';
  cardClone.querySelector('.card-bottom-quality').innerText = qualityName;
  starCheck(idea, cardClone);
}

function starCheck(idea, cardClone) {
  if (idea.star === true) {
    cardClone.querySelector('.star-icon').setAttribute('src', 'images/star-active.svg');
  }
  if (idea.star === false) {
    cardClone.querySelector('.star-icon').setAttribute('src', 'images/star.svg');
  }
}

function toggleSaveBtn(e) {
  if (inputIdeaBody.value && inputIdeaTitle.value != '') {
    btnSaveIdea.disabled = false;
  } else {
    btnSaveIdea.disabled = true;
  }
}

function cardActions(e) {
  e.preventDefault();
  let target = e.target;
  if (target.matches('.card-top-icon-remove')) {
    removeCard(target);
  }
  if (target.matches('.card-bottom-icon')) {
    voteCard(target);
  }
  if (target.matches('.star-icon')) {
    starChange(target);
  }
  if (e.target.matches('.card-body')){
    enterKeyPress(e);
  }
}

function divideIdeas() {
  hiddenIdeas = []
  ideas.forEach(function(el) {
    if (ideas.indexOf(el) > 9) {
      hiddenIdeas.push(el);
      ideas.splice(0, 1);
    } else {
      addCardToDOM(el);
    }
  })
}

function toggleMoreIdeas() {
  if (btnShow.innerText === 'Show More') {
    btnShow.innerText = 'Show Less'
    ideas = ideas.concat(hiddenIdeas);
  }
  if (btnShow.innerText === 'Show Less') {
    btnShow.innerText = 'Show More'
  }
}

function editText(e) {
  var editedText = e.target.innerText;
  // var ideaIndex = ideas.indexOf(targetIdea);
  var parsedId = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'));
  var targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  if (e.target.matches('.card-title')) {
    targetIdea.updateTitle(targetIdea, editedText)
  }
  if (e.target.matches('.card-body')) {
  targetIdea.updateBody(targetIdea, editedText)     
  }
}

function removeCard(target) {
  const parsedId = parseInt(target.parentNode.parentNode.getAttribute('data-id'));
  const targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  const ideaIndex = ideas.indexOf(targetIdea);
  target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
  targetIdea.deleteFromStorage(ideaIndex);
  hideEmptyMessage();
}

function voteCard(target) {
  const parsedId = parseInt(target.parentNode.parentNode.dataset.id);
  const targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  const ideaIndex = ideas.indexOf(targetIdea);
  const qualityName = target.parentNode.querySelector('.card-bottom-quality');
  if (target.matches('.card-bottom-icon-upvote')) {
    targetIdea.upvote(ideaIndex);
  }
  if (target.matches('.card-bottom-icon-downvote')) {
    targetIdea.downvote(ideaIndex);
  }
  qualityName.innerText = qualities[ideas[ideaIndex].quality];
}


function khalidify() {
  if (inputIdeaTitle.value === 'Khalid') {
    console.log('DJ KHALID!!')
    ideas.forEach(element => {
      element.body =
        "Lorem Khaled Ipsum is a major key to success. Bless up. Learning is cool, but knowing is better, and I know the key to success. They never said winning was easy. Some people can’t handle success, I can. Look at the sunset, life is amazing, life is beautiful, life is what you make it. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh"
        element.title = 'DJ KHALID!!!'
        element.quality[0]
    });
  }
} 

function starChange(target) {
  const parsedId = parseInt(target.parentNode.parentNode.dataset.id);
  const targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  targetIdea.changeStar()
  if (targetIdea.star === true) {
    target.setAttribute('src', 'images/star-active.svg');
    noStarDisplay.classList.add('toggle');
  }
  if (targetIdea.star === false) {
    target.setAttribute('src', 'images/star.svg');
  }
}