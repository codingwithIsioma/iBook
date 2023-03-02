// Imports function from shelf.js
// const {addingBookFunction} = require('./shelf.js')

// FETCHING THE TRENDING SECTION
const trendField = document.getElementById("trending__container")
const modalField = document.getElementById("modal")

let trendUrl = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBOJn2pK_sIwGXDWno2Hoz9pSk-zJkSM4A&q=subject:fiction&orderBy=newest&maxResults=10&langRestrict=en"
const getTrendingBooks = ()=> {
    fetch(trendUrl)
    .then((response) => {
        if(response.ok) {
            return response.json()
        }
    })
    .then(data => {
        // console.log(data.items)
        trendDisplay.bookDisplay(data);
        trendDisplay.modalDisplay(data);
        addingBookFunction(data);
    })
    .catch(err => console.log(err));
}

// Trend Class: Displays the trending section and its modal to the UI
class trendDisplay {
    // displays the trending books
    static bookDisplay(data) {
        let bookDisplay = '';
        data.items.forEach(bookItem => {
            const bookID = bookItem.id
            const bookImage = bookItem.volumeInfo.imageLinks.thumbnail
            const bookTitle = bookItem.volumeInfo.title.slice(0, 19)
            const bookAuthor = bookItem.volumeInfo.authors[0]

            bookDisplay += `
                    <article class="flex-shrink-0 mr-4 trends" data-target="#modal${bookID}">
                        <div class="trend__image">
                            <img src="${bookImage}">
                        </div>
                        <div class="trend__info">
                            <h4>${bookTitle}</h4>
                            <p>${bookAuthor}</p>
                        </div>
                    </article>
            `
        })
        trendField.innerHTML = bookDisplay;

        // add event listeners to each article element to open corresponding modal content
        const articles = document.querySelectorAll('.trends');
        articles.forEach((article)=> {
            article.addEventListener("click", ()=> {
                const targetModalID = article.getAttribute('data-target');
                const targetModal = document.querySelector(targetModalID)
                targetModal.classList.add('open-modal')
            })
        })
    }

    // displays more information on a book selected
    static modalDisplay(data) {
        let modalDisplay = '';
        // loops through the json data and gets and sets the modal content
        data.items.forEach(bookItem => {
            const bookDesc = `${bookItem.volumeInfo.description.slice(0, 300)}..."`
            const bookID = bookItem.id
            const bookImage = bookItem.volumeInfo.imageLinks.thumbnail
            const bookTitle = bookItem.volumeInfo.title
            const bookAuthor = bookItem.volumeInfo.authors[0]

            modalDisplay += `
                    <div class="modal-overlay" id="modal${bookID}">
                        <div class="modal__container">
                            <button class="close-btn" data-target="#modal${bookID}">
                                <i class="fas fa-times"></i>
                            </button>
                    
                            <div class="modal__content">
                                <div class="modal__left">
                                    <img src="${bookImage}">
                                </div>
                                <div class="modal__right">
                                    <h3 class="modal_title">${bookTitle}</h3>
                                    <p class="author"><span><i class="fas fa-book"></i></span> ${bookAuthor}</p>
                                    <button class="btn hero-btn">Start Reading</button>
                                    <button id="add-btn" class="btn red-btn" data-target="#modal${bookID}"><i class="fas fa-plus"></i></button>
                                    <p>${bookDesc}</p>
                    
                                    <h5 class="more">More Details <span><i class="fas fa-angle-right"></i></span></h5>
                                </div>
                                
                            </div>
                        </div>  
                    </div>
            `
        });
        // adds the modal content to the html file
        modalField.innerHTML = modalDisplay

        // adds an eventlistener to close the corresponding modal class when opened
        const closeBtns = document.querySelectorAll('.close-btn');
        closeBtns.forEach(btn => {
            btn.addEventListener("click", ()=> {
                const targetButtonID = btn.getAttribute('data-target');
                const targetButton = document.querySelector(targetButtonID)
                targetButton.classList.remove('open-modal')
            })
        })
    }
}

// Calls the promise on the trend section
getTrendingBooks();
// Sets an interval on the trending books return data and gets new batches every 7 days
setInterval(getTrendingBooks, 7 * 24 * 60 * 60 * 1000);
