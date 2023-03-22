// Everything related to displaying in UI
class storeUI {
    // Displays books in the UI
    static displayBooks(data, container) {
        let bookDisplay = '';
        // Filters the received data
        const filteredBooks = data.works.filter((item)=> item.edition_count && item.availability)
        filteredBooks.forEach((bookItem)=> {
            // Checks that the availability of book has the isbn as not null
            if (bookItem.availability.isbn !== null) {
                // console.log(bookItem)]
                const bookCoverID = bookItem.cover_id;
                const bookDownloadCountAlt = bookItem.edition_count;
                const bookTitle = bookItem.title.slice(0, 19);

                bookDisplay += `
                    <article class="flex-shrink-0 mr-4 stores">
                        <div class="store__image" data-target="#modal${bookCoverID}">
                            <img src="https://covers.openlibrary.org/b/id/${bookCoverID}-M.jpg">
                        </div>
                        <div class="store__info">
                            <h4>${bookTitle}</h4>
                            <div class="download-details">
                                <p class="download-count">${bookDownloadCountAlt}</p>
                                <button class="download-btn"><i class="fas fa-download"></i></button>
                            </div>
                        </div>
                    </article>
                `

                // displays to a particular container specified when function is called
                container.innerHTML = bookDisplay;
                // adds event listeners to each article element to open corresponding modal
                const articles = document.querySelectorAll('[data-target]');
                articles.forEach((article)=> {
                    article.addEventListener('click', ()=> {
                        const targetModalID = article.getAttribute('data-target');
                        const targetModal = document.querySelector(targetModalID)
                        targetModal.classList.add('open-modal')
                        // console.log(targetModalID)
                        // console.log(targetModal)
                    })
                })
            }
        })
    }

    // Displays the modals in the UI
    static modalGetBooks = (data, modalContainer)=> {
        let modalDisplay = ''
        data.works.forEach(bookItem => {
            const bookKey = bookItem.key
            const bookUniqueUrl = `https://openlibrary.org${bookKey}.json`
            fetch(bookUniqueUrl)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then(modalData => {
                // console.log(modalData)
                if (modalData.description) {
                    const bookDesc = modalData.description.slice(0, 200);
                    const bookCoverID = bookItem.cover_id;
                    const bookTitle = modalData.title;
                    const bookAuthor = bookItem.authors[0].name;

                    modalDisplay += `
                            <div class="store_modal-overlay" id="modal${bookCoverID}">
                                <div class="store_modal-container">
                                    <button class="close-btn" data-target="#modal${bookCoverID}">
                                        <i class="fas fa-times"></i>
                                    </button>
                
                                    <div class="store_modal-content">
                                        <div class="store_modal-left">
                                            <img src="https://covers.openlibrary.org/b/id/${bookCoverID}-M.jpg">
                                        </div>
                                        <div class="store_modal-right">
                                            <h3 class="store_modal-title">${bookTitle}</h3>
                                            <p class="author"><span><i class="fas fa-book"></i></span> ${bookAuthor}</p>
                                            <button class="btn hero-btn">Start Reading</button>
                                            <button class="btn red-btn"><i class="fas fa-plus"></i></button>
                                            <p>${bookDesc}</p>
                    
                                            <h5 class="more">More Details <span><i class="fas fa-angle-right"></i></span></h5>
                                        </div>
                                        
                                    </div>
                                </div>  
                            </div>
                    `
                    modalContainer.innerHTML = modalDisplay;
                    // console.log(modalContainer)
                    const closeBtns = document.querySelectorAll('.close-btn');
                    closeBtns.forEach((btn)=> {
                        btn.addEventListener('click', ()=> {
                            const targetButtonID = btn.getAttribute('data-target');
                            const targetButton = document.querySelector(targetButtonID)
                            targetButton.classList.remove('open-modal')
                        })
                    })
                }
            })
            .catch(err=> console.log(err))
        })
        
    }
}

const getBooks = async (genre, modalContainer, container) => {
    const url = `https://openlibrary.org/subjects/${genre}.json?limit=40&ebooks=true&details=true&published_in=2000-2023`
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            storeUI.modalGetBooks(data, modalContainer)
            storeUI.displayBooks(data, container)
        }
    } catch (error) {
        console.log(error);
    }
}

const getNewReleasedBooks = async (genre, modalContainer, container) => {
    const url = `https://openlibrary.org/subjects/${genre}.json?limit=40&ebooks=true&details=true&published_in=2022-2023`
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            storeUI.modalGetBooks(data, modalContainer)
            storeUI.displayBooks(data, container)
        }
    } catch (error) {
        console.log(error);
    }
}

// Getting and displaying featured books
const featuredField = document.getElementById("featured__container");
const featuredModal = document.getElementById("featured-modal")
getBooks('action_&_adventure', featuredModal, featuredField);

// Getting and displaying new released books
const newReleaseField = document.getElementById("new-release__container");
const newReleaseModal = document.getElementById("new_release-modal")
getNewReleasedBooks('thriller', newReleaseModal, newReleaseField);

// Getting and displaying horror books
const horrorField = document.getElementById("horror-specials__container");
const horrorModal = document.getElementById("horror_specials-modal")
getBooks('horror_stories', horrorModal, horrorField);

// Getting and displaying adult romance books
const adultRomanceField = document.getElementById("adult-romance__container");
const adultRomanceModal = document.getElementById("adult_romance-modal")
getBooks('fiction_romance_erotic', adultRomanceModal, adultRomanceField);

// Getting and displaying adult romance books
const teenFictionField = document.getElementById("teen-fiction__container");
const teenFictionModal = document.getElementById("teen_fiction-modal")
getBooks('fiction_fantasy_general', teenFictionModal, teenFictionField);