const random_quote_api_url = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');


// event listener to check if characters are correct or not
quoteInputElement.addEventListener('input', () => {
    // gets every span within quoteDisplayElement (so gets all characters in quote)
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    // converts user input's characters into array
    const arrayValue = quoteInputElement.value.split('')
    let correct = true;
    // loop through arrays to compare
    arrayQuote.forEach((characterSpan,index) => {
        const character = arrayValue[index];
        if(character==null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');

        }
        else{
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    })
    // change to new quote if current quote properly input
    if(correct) renderNewQuote();
})

function getRandomQuote() {
    // fetch random quote from quote API
    return fetch(random_quote_api_url)
        // if successful, return json as response object
        .then(res => res.json())
        // return "content" portion of data
        .then(data => data.content)
}

// need key words "async" and "await" to run asynchronous function
async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML= '';
// passing empty quotes in split function takes string and turns it into an array where
// each character is an element in the array
    quote.split('').forEach(character =>{
        // take each individual character is string and create span for it and setting the 
        // text of that span to that individual character
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan)
    })
        // clears out any text in quote input area
    quoteInputElement.value = null; 
    console.log(quote)
    startTimer();
}
// compare start date to current date to get actual time that's elapsed
let startTime;
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(()=> {
        timer.innerText =  getTimerTime()
    }, 1000)
}

function getTimerTime(){
    // Math.floor always rounds down
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();

