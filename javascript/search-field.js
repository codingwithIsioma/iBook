// Allows cookies to be sent btw cross-sites (third-party sites)
document.cookie = "my_cookie_name=my_cookie_value; SameSite=None";

// Selects the form data
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchField = document.querySelector("#searchField");

// Search promise
const searchFetch = ()=> {

    // encodes the input value being received by user
    url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput.value)}&maxResults=40`
    // console.log(url)
    fetch(url)
    .then((data)=> {
        try {
            if(data.ok){
                return data.json()
            }
        } catch(e) {
            console.log('Error: ' + e)
        }
    })
    .then((data)=> {
        fetchingFunc.searchAuthorTitle(data);
        addingBookFunction(data)
    })
    .catch((err)=> {
        document.querySelector("#search-container").innerHTML = `
                <p class="error-message">
                    No suggestions were found! <br>
                    Try again with another keyword.
                </p>
                `// document.querySelector("#search-container").innerHTML = `<p class="error-message">Couldn't find keyword.</p>`
        console.log(err)
    })
}

class fetchingFunc {
    // function that accepts the json data from the fetch promise
    // works and filters the data to be displayed to UI
    static searchAuthorTitle(data) {
        // filters the url data into search by author or title
        // checks if the input value is in either the authors or title key:value pairs in the json data
        // Takes all the key value pairs that match and set it to either booksby author or title
        // also formats the input and the value pair so that they always match
        const booksByAuthor = data.items.filter((item)=> item.volumeInfo.authors && item.volumeInfo.authors.some(el=> el.toLowerCase().includes(searchInput.value.toLowerCase())) && item.volumeInfo.imageLinks)
        const booksByTitle = data.items.filter((item) => item.volumeInfo.title && item.volumeInfo.title.toLowerCase().includes(searchInput.value.toLowerCase()) && item.volumeInfo.imageLinks)
        // checks that the booksby author array is not empty
        if (booksByAuthor.length > 0) {
            // console.log(booksByAuthor);
            
            let authorsDisplay = ''
            // loops through the booksby author array and displays the result to UI
            booksByAuthor.forEach((book)=> {
                const bookID = book.id;
                const bookTitle = book.volumeInfo.title.slice(0, 35);
                const bookImage = book.volumeInfo.imageLinks.thumbnail;
                const bookLink = book.volumeInfo.canonicalVolumeLink;
                const bookAuthors = book.volumeInfo.authors.join(', ');
                const bookGenre = book.volumeInfo.categories;
                const publishDate = book.volumeInfo.publishedDate;
                const language = book.volumeInfo.language;

                authorsDisplay += `
                <div class="search_content" id="modal${bookID}">
                    <div class="search_details">
                        <div class="search_left">
                            <img src="${bookImage}""" alt="${bookTitle}">
                        </div>
                        <div class="search_right">
                            <a class="search_title" href="${bookLink}" target="_blank">${bookTitle}</a>
                            <p class="author"><strong>Author(s):</strong> ${bookAuthors}</p>
                            <p><strong>Genre:</strong> ${bookGenre}</p>
                            <p><strong>Published:</strong> ${publishDate}</p>
                            <p><strong>Language:</strong> ${language}</p>
                            <div class="search_addtolist">
                                <button id="add-btn" class="hover:bg-purple-700 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded add_btn" data-target="#modal${bookID}">Add To Shelf</button>
                            </div>
                        </div>
                    </div>
                    <hr class="search_divisor">
                </div>
                `
            })
            // console.log(authorsDisplay)
            searchField.innerHTML = authorsDisplay;
            // sets the error message to empty incase the user searches for a correct keyword after searching a wrrong one
            document.querySelector("#search-container").innerHTML = ''
        } else {
            // if not found in booksby author checks the booksby title and checks that it is not empty as well
            if (booksByTitle.length > 0) {
                // console.log(booksByTitle)
                
                let titlesDisplay = ''
                // loops through the array and displays the result to the UI
                booksByTitle.forEach((book)=> {
                    const bookID = book.id;
                    const bookTitle = book.volumeInfo.title.slice(0, 35);
                    const bookImage = book.volumeInfo.imageLinks.thumbnail;
                    const bookLink = book.volumeInfo.canonicalVolumeLink;
                    const bookAuthors = book.volumeInfo.authors.join(', ');
                    const bookGenre = book.volumeInfo.categories;
                    const publishDate = book.volumeInfo.publishedDate;
                    const language = book.volumeInfo.language;
                    console.log(bookImage)

                    titlesDisplay += `
                    <div class="search_content" id="modal${bookID}">
                        <div class="search_details">
                            <div class="search_left">
                                <img src="${bookImage}">
                            </div>
                            <div class="search_right">
                                <a class="search_title" href="${bookLink}" target="_blank">${bookTitle}</a>
                                <p class="author"><strong>Author:</strong> ${bookAuthors}</p>
                                <p><strong>Genre:</strong> ${bookGenre}</p>
                                <p><strong>Published:</strong> ${publishDate}</p>
                                <p><strong>Language:</strong> ${language}</p>
                                <div class="search_addtolist">
                                    <button id="add-btn" class="hover:bg-purple-700 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded add_btn" data-target="#modal${bookID}">Add To Shelf</button>
                                </div>
                            </div>
                        </div>
                        <hr class="search_divisor">
                    </div>
                    `
                })
                // console.log(titlesDisplay)
                searchField.innerHTML = titlesDisplay;
                // sets the error message to empty incase the user searches for a correct keyword after searching a wrrong one
                document.querySelector("#search-container").innerHTML =''
            } // if both of the above returns empty arrays, then display an error message
            else {
                document.querySelector("#search-container").innerHTML = `
                <p class="error-message">
                    No suggestions were found! <br>
                    Try again with another keyword.
                </p>
                `
            }
        }
    }
}

// Clears the search response field and displays new search
const displayNewSearch = (e)=> {
    e.preventDefault();
    while(searchField.firstChild) {
        searchField.removeChild(searchField.firstChild)
    }
    searchFetch();
    searchInput.value = '';
}

// Adds the entire functions to the event listener for the search button
searchBtn.addEventListener('click', displayNewSearch)




 // Test to return both author and title 
        // const bothAuthorAndTitle = booksByTitle && (booksByAuthor || booksByTitle)
        // if (bothAuthorAndTitle.length > 0) {
        //     console.log(bothAuthorAndTitle)
        //     console.log("From both")
        // }