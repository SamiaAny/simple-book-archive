const showNumberOfResult = document.getElementById('found-number');
//error messages
const showErrorMsg = (errorMsg) => {
    document.getElementById('error-msg').innerText = errorMsg;
}

//spinner option
const toggleSpinner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}

//toggle search area
const toggleSearchResult = (displayStyle) => {
    document.getElementById('display-book-info').style.display = displayStyle;
}

//handle onclick event
const searchResult = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    toggleSpinner('inline-block');
    toggleSearchResult('none');

    //load data
    const searchUrl = `https://openlibrary.org/search.json?q=${searchText}`;

    const res = await fetch(searchUrl);
    const data = await res.json();
    displayResult(data.docs);

}

//display the search result
const displayResult = (booksInfo) => {
    const divContainer = document.getElementById('search-result');
    divContainer.textContent = '';

    //handling error
    if (booksInfo.length === 0) {
        showErrorMsg("Result not found!");
        showNumberOfResult.innerText = '';
    }
    else {
        showErrorMsg("");
        showNumberOfResult.innerText = `${booksInfo.length} result found`;
    }
    //use slice for displayign limited portion
    const books = booksInfo.slice(0,30);
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow border-0">        
                <div class="img-resize p-4">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top img-fluid" alt="...">
                </div>           
                <div class="card-body">
                    <h3 class="card-title">${book.title} ${getInfo(book.subtitle)}</h3>
                    <p><strong>Author: </strong> ${getInfo(book.author_name)}</p>
                    <p><strong>Publisher: </strong>${getInfo(book.publisher)}</p>
                    <p class="card-text">First published in ${getInfo(book.first_publish_year)}</p>
                </div>
            </div>
        `;
        divContainer.appendChild(div);
    })
    toggleSpinner('none');
    toggleSearchResult('block');
    //footer option
    document.querySelector('#footer-section').classList.remove('d-none');
}

//return book info(name,author,publish related) dispaly inside card
const getInfo = info => {
    if(Array.isArray(info)) {
        const result = info ? info[0] : 'unknown';
        return result;
    }
    else {
        const result = info ? info : 'unknown';
        return result;
    }
}
