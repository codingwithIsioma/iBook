
class Category {
    static getCategory = (el) => {
        let genreQuery;
        if (el.classList.contains('browse-title')) {
            genreQuery = el.textContent.toLowerCase();
            console.log(encodeURIComponent(genreQuery))
            // window.location.href = `category.html?name=${encodeURIComponent(genreQuery)}`;
        }

        const param = new URLSearchParams(window.location.search)
        const genreName = param.get('name')

        const genreUrl = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyBOJn2pK_sIwGXDWno2Hoz9pSk-zJkSM4A&q=subject:${encodeURIComponent(genreName)}&maxResults=40&country=us`
        console.log(genreUrl)
        fetch(genreUrl)
        .then((response)=> {
            if(response.ok) {
                return response.json();
            }
        })
        .then((data)=> {
            Category.displayCategory(data)
        })
        .catch((err)=> console.log(err))
    }

    static displayCategory = (data) => {
        const categoryField = document.querySelector('.browse-content-container')

        const categoryList = data.items.filter((item)=> item.volumeInfo.pageCount && item.volumeInfo.imageLinks)
        console.log(categoryList)
        if (categoryList.length > 0) {
           let categoryDisplay = '';

           categoryList.forEach((book) => {
                const BookImage = book.volumeInfo.imageLinks.smallThumbnail;
                const BookTitle = book.volumeInfo.title;
                const BookAuthor = book.volumeInfo.authors[0];
                const PageCount = book.volumeInfo.pageCount;
                const BookDesc = book.volumeInfo.description;

                categoryDisplay += `
                        <div class="browse__content">
                            <div class="browse__left">
                            <img src="${BookImage}">
                            </div>
                            <div class="browse__right">
                            <h3 class="browse_title">${BookTitle}</h3>
                            <div class="rating">
                                <div class="push-start">
                                    <p class="author"><span><i class="fas fa-book"></i></span> ${BookAuthor}</p>
                                    <p class="rate"><i class="fas fa-list-ul"></i> ${PageCount}</p>
                                </div>
                                <div class="push-end">
                                <button id="add-btn" class="btn green-btn"><i class="fas fa-plus"></i></button>  
                                </div>                       
                            </div>
                            <p class="browse-desc">${BookDesc}...</p>
                            </div>
                        </div>
                `
           });
           console.log(categoryDisplay)
           categoryField.innerHTML = categoryDisplay;
        }
        
    }
}

const searchField = document.querySelector('#searchField');

searchField.addEventListener('click', (e)=> {
    Category.getCategory(e.target);
})
