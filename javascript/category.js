const url = window.location.search;
// console.log(url);

const fullUrl = new URLSearchParams(url);
const category = fullUrl.get('category')
console.log(category)

const genreUrl = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyBOJn2pK_sIwGXDWno2Hoz9pSk-zJkSM4A&q=subject:${encodeURIComponent(category)}&orderBy=relevance&maxResults=40&country=us`
// console.log(genreUrl)
let data;

window.addEventListener('DOMContentLoaded', ()=> {
    data = fetch(genreUrl)
    .then((res)=> res.json())
    .then((data)=> {
        const categoryField = document.querySelector('.browse-content-container')
        const categoryHeader = document.querySelector('.browse-header')

        const categoryList = data?.items.filter((item)=> item.volumeInfo.pageCount && item.volumeInfo.imageLinks && item.volumeInfo.authors && item.volumeInfo.description)
        // console.log(categoryList)
        if (categoryList.length > 0) {
           let categoryDisplay = '';

           categoryList?.forEach((book) => {
                const bookID = book.id;
                const BookImage = book.volumeInfo.imageLinks.smallThumbnail;
                const BookTitle = book.volumeInfo.title;
                const BookAuthor = book.volumeInfo.authors[0].slice(0, 20);
                const PageCount = book.volumeInfo.pageCount;
                const BookDesc = book.volumeInfo.description.slice(0,200);

                categoryDisplay += `
                        <div class="browse__content" id="modal${bookID}">
                            <div class="browse__left">
                            <img src="${BookImage}">
                            </div>
                            <div class="browse__right">
                            <h3 class="browse_title">${BookTitle}</h3>
                            <div class="rating">
                                <div class="push-start">
                                    <p class="author"><span><i class="fas fa-book"></i></span> ${BookAuthor}</p>
                                    <p class="rate"><i class="fas fa-list-ul"></i>${PageCount}</p>
                                </div>
                                <div class="push-end">
                                <button id="add-btn" class="btn green-btn" data-target="#modal${bookID}"><i class="fas fa-plus"></i></button>  
                                </div>                       
                            </div>
                            <p class="browse-desc">${BookDesc}...</p>
                            </div>
                        </div>
                `
           });
        //    console.log(categoryDisplay)
           categoryField.innerHTML = categoryDisplay;
           categoryHeader.innerHTML = category.toUpperCase();
        }
        addingBookFunction(data)
    })
    .catch(err => console.log(err))
    // console.log(data)
})
