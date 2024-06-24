const dialogBox = document.querySelector('.dialog-box');
const openBtn = document.querySelector('.open-btn');
const inputEl = document.querySelectorAll('input');
const closeBtn = document.querySelector('.close');
const confirmBtn = document.querySelector('.confirm');
const outputBox = document.querySelector('output');
const container = document.querySelector('.container');
const library = []
const inputs = Array.from(inputEl);

openBtn.addEventListener('click',()=>{
    dialogBox.showModal();
})

closeBtn.addEventListener('click', () => {
    dialogBox.close();
});

confirmBtn.addEventListener('click',addToLib);

function Book(name,author,noOfPages,readStatus){
    this.name = name;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
}

function addToLib(event){


    let book_name = "";
    let author_name = "";
    let num_pages = "";
    let read_status = "";

    for(i = 0;i<inputs.length;i++){
        if(inputs[i].className == "book-name"){
            book_name = inputs[i].value;
        }else if(inputs[i].className == "author-name"){
            author_name = inputs[i].value;
        }else if(inputs[i].className == "no-of-pages"){
            num_pages = inputs[i].value;
        }else if(inputs[i].className == "read-status" && inputs[i].checked){
            read_status = inputs[i].value;
        }
    }

    const book = new Book(book_name,author_name,num_pages,read_status);
    library.push(book);

    const bookCard = document.createElement('div');
    const bookName = document.createElement('div');
    const authorName = document.createElement('div');
    const numPages = document.createElement('div');
    const readStatus = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    container.appendChild(bookCard);
    bookCard.className = "book-card";
    bookCard.dataset.index = library.indexOf(book);
    bookCard.appendChild(bookName);
    bookCard.appendChild(authorName);
    bookCard.appendChild(numPages);
    bookCard.appendChild(readStatus); 
    bookCard.appendChild(readBtn); 
    readBtn.className = "read";
    bookCard.appendChild(removeBtn); 
    removeBtn.className = "remove";


    readBtn.addEventListener('click',readBook);
    removeBtn.addEventListener('click',removeBook);
    function removeBook(e){
        library.splice(e.target.parentElement.dataset.index,1);
        e.target.parentElement.remove();
    }

    function readBook(e){
        const index = e.target.parentElement.dataset.index;
        if(library[index].readStatus == "No"){
            library[index].readStatus = "Yes";
        }else{
            library[index].readStatus = "No";
        }
        readStatus.textContent = `Read Status:${book.readStatus}`;
    }

    bookName.textContent = `Book Name:${book.name}`;
    authorName.textContent = `Author Name:${book.author}`;
    numPages.textContent = `Number of pages:${book.noOfPages}`;
    readStatus.textContent = `Read Status:${book.readStatus}`;
    readBtn.textContent = "Read";
    removeBtn.textContent = "Remove";
    event.preventDefault();

    dialogBox.close();
}



