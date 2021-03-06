import { sourceQuote } from './quotes.js'

const quotesArray = sourceQuote.split(/\r?\n/);



const quotesMaker = (sentence, author) => {
    let quote = {
        _sentence: sentence,
        _author: author,
        _quoteIndex: 0,
        fav: 0,
        likes: 0,
        timesSeen: 0,
        get author() {
            return this._author;
        },
        get sentence() {
            return this._sentence;
        },
        set sentence(newSentence) {
            this._sentence = newSentence;
        },
        set author(newAuthor) {
            this._author = newAuthor;
        }

    }
    return quote;
};

//      <span id="dog"><img src=".//resources/images/dog.webp"></span>

const authorMaker = (newAuthor) => {
    let author = {
        _author: newAuthor,
        _numberQuotes: 1,
        get author() {
            return this._author;
        },
        set author(newAuthor) {
            this._author = newAuthor;
        },
        get numberQuotes() {
            return this._numberQuotes;
        },
        increaseQuotes() { this._numberQuotes++ },

    }
    return author;
};

const quotesAsembly = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i = i + 2) {
        newArr.push(quotesMaker(arr[i], arr[i + 1]));
    }
    return newArr;
}



let finalArray = quotesAsembly(quotesArray);

let usersQuotes = [];


const getAuthors = (arr) => {
    let authorsArray = []; //array of only name of authors
    let returnAuthorsObjects = []; //array of objects-authors with authors and number of quotes

    for (let i = 0; i < finalArray.length; i++) {
        if (!authorsArray.some(quo => quo === arr[i].author)) {
            let newA = authorMaker(arr[i].author);
            authorsArray.push(arr[i].author);
            returnAuthorsObjects.push(newA);
        } else {
            let indexAu = authorsArray.indexOf(arr[i].author);
            returnAuthorsObjects[indexAu].increaseQuotes();
        }
    } //end of for



    return returnAuthorsObjects;
} //end getAuthors


const showDOM = (element) => {
    document.getElementById(element).style.position = 'static';
    document.getElementById(element).style.visibility = 'visible';
}

const hideDOM = (element) => {
    document.getElementById(element).style.position = 'absolute';
    document.getElementById(element).style.visibility = 'hidden';
}

const showRandomQuotes = () => {
    document.getElementById('placeToPrintAuthors').innerHTML = '';
    document.getElementById('placeToPrintAllQuotes').innerHTML = '';
    document.getElementById('quotesFound').innerHTML = '';
    quotesFound
    hideDOM('favsBox')
    hideDOM('authorsBox')
    hideDOM('allQuotesBox')
    hideDOM('addQuote')
    hideDOM('searchQuote')
    hideDOM('seeyourQuotesBox')

    showDOM('quotesBox')
}

const navigationButtonSearchWordFunction = () => {
    document.getElementById('placeToPrintAuthors').innerHTML = '';
    document.getElementById('placeToPrintAllQuotes').innerHTML = '';
    hideDOM('favsBox')
    hideDOM('authorsBox')
    hideDOM('allQuotesBox')
    hideDOM('addQuote')
    hideDOM('quotesBox')
    hideDOM('seeyourQuotesBox')

    showDOM('searchQuote')
}

const navigationButtonSeeFavsFunction = () => {
    document.getElementById('placeToPrintAuthors').innerHTML = '';
    document.getElementById('placeToPrintAllQuotes').innerHTML = '';
    document.getElementById('quotesFound').innerHTML = '';
    hideDOM('searchQuote')
    hideDOM('authorsBox')
    hideDOM('allQuotesBox')
    hideDOM('addQuote')
    hideDOM('quotesBox')
    hideDOM('seeyourQuotesBox')

    showDOM('favsBox');

}

const navigationButtonSeeAllAuthors = () => {
    document.getElementById('placeToPrintAllQuotes').innerHTML = '';
    document.getElementById('quotesFound').innerHTML = '';
    hideDOM('quotesBox')
    hideDOM('searchQuote')
    hideDOM('favsBox')
    hideDOM('allQuotesBox')
    hideDOM('addQuote')
    hideDOM('seeyourQuotesBox')

    showDOM('authorsBox');
    document.dispatchEvent(printAllAuthors())
}

const navigationButtonSeeAllQuotes = () => {
    document.getElementById('placeToPrintAuthors').innerHTML = '';
    document.getElementById('quotesFound').innerHTML = '';
    hideDOM('searchQuote')
    hideDOM('authorsBox')
    hideDOM('favsBox')
    hideDOM('addQuote')
    hideDOM('quotesBox')
    hideDOM('seeyourQuotesBox')
    
    showDOM('allQuotesBox');

    document.dispatchEvent(printAllQuotes())
}

const navigationButtonAddNewQuote = () => {
    document.getElementById('placeToPrintAuthors').innerHTML = '';
    document.getElementById('placeToPrintAllQuotes').innerHTML = '';
    document.getElementById('quotesFound').innerHTML = '';
    hideDOM('searchQuote')
    hideDOM('authorsBox')
    hideDOM('allQuotesBox')
    hideDOM('favsBox')
    hideDOM('quotesBox')
    hideDOM('seeyourQuotesBox')
    
    showDOM('addQuote');
}

  


const navigationButtonSeeAddedQuotes = () => {
    document.getElementById('placeToPrintAuthors').innerHTML = '';
    document.getElementById('placeToPrintAllQuotes').innerHTML = '';
    document.getElementById('quotesFound').innerHTML = '';
    hideDOM('searchQuote')
    hideDOM('authorsBox')
    hideDOM('allQuotesBox')
    hideDOM('favsBox')
    hideDOM('quotesBox')
    hideDOM('addQuote')

    showDOM('seeyourQuotesBox');
}

const compare = (arr, num) => {
    return arr.some(numb => num === numb)
}

const generateArrRandomNum = arrLength => {
    let arrRan = [];
    for (let i = 0; i < arrLength; i++) {
        let random = Math.floor(Math.random() * arrLength)
        if (compare(arrRan, random)) {
            i--
        } else {
            arrRan.push(random)
        }


    }//end for
    return arrRan
}//end generateArrRandomNum

let arrayRandom = generateArrRandomNum(finalArray.length);


let incDecrorderDisplayed = -1; //this is the variable that is used to increase or decrease the orderDisplayed variable. Its value is in real order: 0, 1, 2...
let orderDisplayed = arrayRandom[incDecrorderDisplayed]; //this is the index that will be used to determine in which Quote the functions are in each moment. All of them call to the name "orderDisplayed"

//add a random number as quoteIndex to each quote.
const addIndexToQuotes = (arr, arrRandom) => {
    for (let i = 0; i < finalArray.length; i++) {
        finalArray[i]._quoteIndex = 1000 + arrRandom[i];
    }
}
addIndexToQuotes(finalArray, arrayRandom);

//function to print next Quote
const printNextQuote = () => {
    incDecrorderDisplayed = incDecrorderDisplayed + 1;
    if (incDecrorderDisplayed === finalArray.length) {
        incDecrorderDisplayed = 0;
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'> You saw all the quotes available! </h2>`;
    } else {

        orderDisplayed = arrayRandom[incDecrorderDisplayed];
        finalArray[orderDisplayed].timesSeen++;

        //select where it will be printed
        document.getElementById('placeToPrint').innerHTML =
            `<h2>${finalArray[orderDisplayed].sentence} <br><br> <span id="authorsquotes">by ${finalArray[orderDisplayed].author} </span></h2> `;
    }
};


//function to print previous quote
const prevQuote = () => {
    if (incDecrorderDisplayed > 0) {
        incDecrorderDisplayed = incDecrorderDisplayed - 1;
        orderDisplayed = arrayRandom[incDecrorderDisplayed];
        finalArray[orderDisplayed].timesSeen++;
        document.getElementById('placeToPrint').innerHTML =
            `<h2> ${finalArray[orderDisplayed].sentence} <br><br> <span id="authorsquotes">by ${finalArray[orderDisplayed].author} </span></h2>`;
    } else if (incDecrorderDisplayed === 0) {
        document.getElementById('placeToPrint').innerHTML =
            `<h2 id='warning'>There is no previous Quote to the one you just saw. Press Next again to see a second quote.</h2>`;
    } else if (incDecrorderDisplayed === -1) {
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'>There is no previous Quote. Press Next to see the first one.</h2>`;
    }
};





const compareQuote = (arr, num) => {
    return arr.some(numb => num === numb.sentence)
}
//implement add to favs
let favsArray = [];
const addToFav = (favQuote) => {
    favsArray.push(favQuote);
}
const addQuoteToFav = () => {
    if (incDecrorderDisplayed === -1) {
        document.getElementById('placeToPrint').innerHTML = `<h2 id='warning'> There is no quote to add, press Next to see the first quote. </h2>`;
    } else if (!compareQuote(favsArray, finalArray[orderDisplayed].sentence)) {
        finalArray[orderDisplayed].fav++;
        addToFav(finalArray[orderDisplayed])
        document.getElementById('placeToPrintFavs').innerHTML =
        `<h2> ${finalArray[orderDisplayed].sentence} <br>
        <span id="authorsquotes">by ${finalArray[orderDisplayed].author} </span><br>`
        document.getElementById('placeToPrint').innerHTML =
            `<h2> ${finalArray[orderDisplayed].sentence} <br>
            <span id="authorsquotes">by ${finalArray[orderDisplayed].author} </span><br>
             <h2 id='successfulAction'> Quote added to Favs </h2>`
    } else {
        document.getElementById('placeToPrint').innerHTML =
            `<h2 id='warning'> You already added that quote to favs. </h2>`
    }

};


const printAllFavs = () => {

    let allFavs = favsArray.map((a) => {
        return `${a.sentence} <br><span id="authorsquotes"> By  ${a.author} </span><br><br>`;
    })
    if (favsArray.length === 0) {
        document.getElementById('placeToPrintFavs').innerHTML = `<h2 id='warning'> You don't have favorite quotes yet. </h2>`;
    } else if (favsArray.length === 1) {
        document.getElementById('placeToPrintFavs').innerHTML = `<h2 id='successfulAction'> Your Fav: </h2><h2> ${allFavs.join('\n')} </h2>`;
    } else if (favsArray.length > 1 && favsArray.length < 3) {
        document.getElementById('placeToPrintFavs').innerHTML = `<h2 id='successfulAction'> Your Favs: </h2><h2> ${allFavs.join('\n')} </h2>`;
    } else {
        document.getElementById('placeToPrintFavs').innerHTML =
            `<h2 id='successfulAction'> Your Favs: </h2><h2> ${allFavs.join('\n')}  <a href="#" class="navigationButton">Go back to the Top</a></h2>`;
    }
    //  
    /*Pay close attention to the .join('\n'), without it, when there are more than 1 element, it will print a comma between them. */
}





//function to check if a quote is already added
const checkFinalArray = (word) => {
    for (let i = 0; i < finalArray.length; i++) {
        if (finalArray[i].sentence === word) {
            return true
        }
    }
    return false
}

//function to add a new quote
const getQuote = () => {
    const userQuote = document.getElementById('typeNewQuote').value;
    const userQuoteAuthor = document.getElementById('typeNewAuthor').value;

    if (userQuote === '' || userQuoteAuthor === '') {
        document.getElementById('printYourQuotesJustAdded').innerHTML = `<h2 id='warning'>Please type both quote and author</h2>`;
    } else {

        if (checkFinalArray(userQuote)) {
            document.getElementById('printYourQuotesJustAdded').innerHTML = `<h2 id='warning'>That quote is already added</h2>`;
        } else {
            let newQuote = quotesMaker(userQuote, userQuoteAuthor);
            document.getElementById("typeNewQuote").value = "";
            document.getElementById("typeNewAuthor").value = "";
            usersQuotes.push(newQuote);
            document.getElementById('printYourQuotesJustAdded').innerHTML =
                `<h2 id='successfulAction'> Quote added: </h2><h2> ${usersQuotes[usersQuoteIndex].sentence} 
                <span id="authorsquotes">by ${usersQuotes[usersQuoteIndex].author}</span></h2>`;
            finalArray.push(newQuote);
            document.getElementById('printYourQuotes').innerHTML = `<h2> ${usersQuotes[usersQuoteIndex].sentence} 
            <span id="authorsquotes">by ${usersQuotes[usersQuoteIndex].author}</span></h2>`;
        }
    }
};


//funtion to print next quote added by the user
let usersQuoteIndex = 0;
const printYourQuotes = () => {
    if(usersQuoteIndex === 0){
        document.getElementById('printYourQuotes').innerHTML = `<h2 id='warning'>You didn't add any quote yet</h2>`
    }
    if (usersQuoteIndex < usersQuotes.length) {
        document.getElementById('printYourQuotes').innerHTML =
            `<h2> ${usersQuotes[usersQuoteIndex].sentence}  
            <span id="authorsquotes">by ${usersQuotes[usersQuoteIndex].author}</span></h2>`;
        usersQuoteIndex++;
    } else {
        usersQuoteIndex = 0;
        document.getElementById('printYourQuotes').innerHTML =
            `<h2> ${usersQuotes[usersQuoteIndex].sentence}  
            <span id="authorsquotes">by ${usersQuotes[usersQuoteIndex].author}</span></h2>`;
    }
}




const searchQuote = () => {
    const word = document.getElementById('wordToSearch').value;
    if (word === "") {
        document.getElementById('quotesFound').innerHTML =
            `<h2 id='warning'>You did not type anything. Please type a word.</h2>`;
    } else {
        let quotesFound = [];
        let numberOfQuotesFound = 0;
        for (let i = 0; i < finalArray.length; i++) {
            let toUpper = finalArray[i].sentence.toUpperCase();
            if ((toUpper.search(word.toUpperCase()) != -1) || (toUpper.split(/,| |./).some(Word => Word === word.toUpperCase()))) {
                quotesFound.push(finalArray[i]);
                numberOfQuotesFound++;
            }
        }
        let allFound = quotesFound.map((a) => {
            return `${a.sentence}  <br> <span id="authorsquotes">by ${a.author}</span><br><br>`;
        })
        document.getElementById("wordToSearch").value = "";
        if (numberOfQuotesFound === 0) {
            document.getElementById('quotesFound').innerHTML =
                `<h2 id='warning'>There is no quote with <span class="textToSearch">"${word}"</span>, you should add some!</h2>`;
        } else if (numberOfQuotesFound === 1) {
            document.getElementById('quotesFound').innerHTML =
                `<h2 id='successfulAction'><span class="textToSearch">"${word}"</span> found ${numberOfQuotesFound} time: </h2> 
                            <br> <h2>${allFound.join('\n')}</h2>  <br><a href="#" class="navigationButton">Go back to the Top</a>`;
        } else {
            document.getElementById('quotesFound').innerHTML =
                `<h2 id='successfulAction'><span class="textToSearch">"${word}"</span> found ${numberOfQuotesFound} times: </h2>
                        <br> <h2>${allFound.join('\n')}</h2>  <br><a href="#" class="navigationButton">Go back to the Top</a>`;
        }
    }
}

const compareAuthorsNames = (a, b) => {
    if (a.author < b.author) {
        return -1;
    }
    if (a.author > b.author) {
        return 1;
    }
    return 0;
}



const printAllAuthors = () => {
    let arrayAuthors = getAuthors(finalArray);
    let orderAuthors = arrayAuthors.sort(compareAuthorsNames);
    let allAuthors = orderAuthors.map((a) => {
        return `${a.author} - with ${a._numberQuotes} quotes. <br><br>`;
    })
    document.getElementById('placeToPrintAuthors').innerHTML =
        `<h2 id='successfulAction'> ${arrayAuthors.length} authors: </h2>
         <h2> ${allAuthors.join('\n')} <br><a href="#" class="navigationButton">Go back to the Top</a></h2>`;
}


const compareLengthQuotes = (a, b) => {
    if (a.sentence < b.sentence) {
        return -1;
    }
    if (a.sentence > b.sentence) {
        return 1;
    }
    return 0;
}


const printAllQuotes = () => {
    let allQuotesArray = finalArray.sort(compareLengthQuotes);
    let allQuotesOrdered = allQuotesArray.map((a) => {
        return `${a.sentence} <br><span id="authorsquotes"> By  ${a.author} </span><br><br>`;
    })
    document.getElementById('placeToPrintAllQuotes').innerHTML =
        `<h2 id='successfulAction'> ${finalArray.length} quotes: </h2><h2> ${allQuotesOrdered.join('\n')}  
        <a href="#" class="navigationButton">Go back to the Top</a></h2>`;
}



//navigationmenu buttons
const randomQuotes = document.getElementById('randomQuotes');


//select button we will link
const printPrevButton = document.getElementById('prev');
const nextButton = document.getElementById('nextb');
const favButton = document.getElementById('favb');
const printFavsButton = document.getElementById('printFavs');

const printYourQuotesButton = document.getElementById('printYourQuotesButton');
const addNewQuote = document.getElementById('newQuote');
const seeAllQuotes = document.getElementById('allQuotes');
const buttonSearch = document.getElementById('searchQuotesByWord');
const navigationButtonSearchWord = document.getElementById('searchQuotes');


//link button to functions
printPrevButton.addEventListener('click', prevQuote);
nextButton.addEventListener('click', printNextQuote);
favButton.addEventListener('click', addQuoteToFav);
printYourQuotesButton.addEventListener('click', printYourQuotes);
addNewQuote.addEventListener('click', getQuote);
seeAllQuotes.addEventListener('click', printAllQuotes);
buttonSearch.addEventListener('click', searchQuote);
randomQuotes.addEventListener('click', showRandomQuotes);
navigationButtonSearchWord.addEventListener('click', navigationButtonSearchWordFunction);
printFavsButton.addEventListener('click', navigationButtonSeeFavsFunction);
document.getElementById('printYourFavs').addEventListener('click', printAllFavs);
document.getElementById('seeAuthors').addEventListener('click', navigationButtonSeeAllAuthors);
document.getElementById('allQuotes').addEventListener('click', navigationButtonSeeAllQuotes);
document.getElementById('addNewQuote').addEventListener('click', navigationButtonAddNewQuote);
document.getElementById('seeAddedQuotes').addEventListener('click', navigationButtonSeeAddedQuotes);
