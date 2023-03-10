// Book Class: Instantiates a new book to be added
class Book {
    constructor(image, title, author, id) {
        this.image = image,
        this.title = title,
        this.author = author,
        this.bookId = id
    }
}

// UI class: Handles everything to the displayed in UI
class UI {
    static displayBooks() {
        // Reaches into local storage and grabs all the books
        const books = Storage.getBooks();

        // Loops through the books from local storage and displays them
        books.forEach((book)=> UI.addBookToShelf(book));
    }

    static addBookToShelf(book) {
        const shelfContainer = document.querySelector("#shelf");

        const shelfBooks = document.createElement('article')
        shelfBooks.classList.add('shelf-items')
        shelfBooks.innerHTML = `
            <div class="shelf-image">
            <img src="${book.image}">
                <div class="layer">
                    <div class="layer-links">
                        <a>Start Reading</a>
                        <a>Details</a>
                        <a class="delete">Remove</a> 
                    </div>
                </div>
            </div>
            <div class="shelf-info" id="${book.bookId}">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
            </div>
        `

        shelfContainer.appendChild(shelfBooks);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.parentElement.parentElement.remove();
            confirm('Are you sure you want to remove book?')
        }
    }
}

// Storage Class: Handles everything related to local storage
class Storage {
    // gets book from the local storage
    static getBooks() {
        let books;
        // Checks if there is nothing in storage first
        if(localStorage.getItem('books') === null) {
            books = [];
        } // Else parses it into a json array
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    // Adds an instantiated book to storage
    static addBooks(book) {
        // Gets the book array first from storage
        const bookList = Storage.getBooks()

        // Checks for duplicate books
        const isDuplicate = bookList.some((storedBook)=> storedBook.bookId === book.bookId)
        if (!isDuplicate) {
            // The new book to the book array
            bookList.push(book);
            // Sets it back to local storage
            localStorage.setItem('books', JSON.stringify(bookList));
        }
        
    }

    // Removes a book from storage
    static removeBooks(el) {
        const books = Storage.getBooks();

        if(el.classList.contains('delete')) {
            books.forEach((book, index)=> {
                if(book.bookId === el.parentElement.parentElement.parentElement.nextSibling.nextElementSibling.id) {
                    books.splice(index, 1);
                }
            });
        }

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event Listener: Displays books to UI
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event Listener: Add book to shelf
const addingBookFunction = (data)=> {
    console.log("Howdy")
    const addBtn = document.querySelectorAll("#add-btn");
    addBtn.forEach((btn)=> {
        btn.addEventListener('click', ()=> {
            // gets the unique data target of the button clicked
            const bookID = btn.getAttribute('data-target');
            // console.log(bookID);

            // find the book in the data array
            const book = data.items.find((book) => `#modal${book.id}` === bookID)
            // console.log(book)

            // instantiate a new book
            const image = book.volumeInfo.imageLinks.thumbnail;
            const title = book.volumeInfo.title.slice(0, 19);
            const author = book.volumeInfo.authors[0];
            const id = book.id;

            const newBook = new Book(image, title, author, id);
            // console.log(newBook);

            // add book to shelf UI (Reminder for the future that you don't need to add to the UI first,
            // add to storage and then you can access the book from there)
            // UI.addBookToShelf(newBook);

            // add book to storage
            Storage.addBooks(newBook);

            // alert to show book was added
            alert('Book added!')
        })
    })
}

// Event Listener: Removes book from shelf
document.getElementById('shelf').addEventListener('click', (e)=> {
    // remove book from UI
    UI.deleteBook(e.target)

    // remove book from local storage
    Storage.removeBooks(e.target)
})
