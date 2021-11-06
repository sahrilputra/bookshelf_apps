const UNCOMPLETED_BOOKSHELF ="uncompletedBook";
const COMPLETED_BOOKSHELF = "completedBook";
const BOOK_ITEM = "bookItemId";

function addBook(){
    const uncompletedItem = document.getElementById(UNCOMPLETED_BOOKSHELF);
    const completedItem = document.getElementById(COMPLETED_BOOKSHELF);
    const inpJudul = document.getElementById("inputBookTitle").value;
    const inpName = document.getElementById("inputBookAuthor").value;
    const inpYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("checkBook").checked;

    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("checkBook").checked = false;

    const book = makeBook(inpJudul, inpName, inpYear, isCompleted);
    const bookObject = composeBookObject(inpJudul, inpName, inpYear, isCompleted);

    book[BOOK_ITEM]=bookObject.id;
    books.push(bookObject);
 
    if(isCompleted){
        completedItem.append(book);
    }else{
        uncompletedItem.append(book);
    }

    updateDataToStorage();
}

function makeBook(inpJudul, inpName, inpYear,isCompleted){
    const judul = document.createElement("h3");
    judul.innerText = inpJudul;
    judul.classList.add("bookTitle");

    const name = document.createElement("p");
    name.classList.add("author");
    name.innerText =inpName;

    const year = document.createElement("p");
    year.classList.add("year");
    year.innerText =inpYear;
    const wrapBtn = document.createElement("div");
    wrapBtn.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("inner");
    
    if(!isCompleted){
        wrapBtn.append(checkButton(), deleteButton(), editButton());
    }else{
        wrapBtn.append(undoButton(), deleteButton(), editButton());
    }
    
    container.append(judul, name, year, wrapBtn);


    return container;
}

function createButton (ButtonTypeClass, text, eventList){
    const newButton = document.createElement("button");
    newButton.classList.add(ButtonTypeClass);
    newButton.innerHTML =(text);
    newButton.addEventListener("click", function(ev){
        eventList(ev);
    });
    return newButton;
}

function checkButton(){
    return createButton("checkBtn", "Done", function(event){
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
}

function deleteButton(){
    return createButton("deleteBtn", "Delete", function(event){
        removeBookItem(event.target.parentElement.parentElement);
    });
}

function undoButton(){
    return createButton("undoBtn", "undo", function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function editButton(){
    return createButton("editBtn", "Edit" , function(event){
        showEditDisplay(event.target.parentElement.parentElement);
    });
}

function addTaskToCompleted(bookItem){
    const completedListNewBook = document.getElementById(COMPLETED_BOOKSHELF);
    const getJudul = bookItem.querySelector(".bookTitle").innerText;
    const getAuthor = bookItem.querySelector(".author").innerText;
    const getYear = bookItem.querySelector(".year").innerText;
    
    const newBook = makeBook(getJudul, getAuthor, getYear, true);      

    const book = findBook(bookItem[BOOK_ITEM]);
    book.isCompleted = true;
    newBook[BOOK_ITEM]= book.id;

    completedListNewBook.append(newBook);
    bookItem.remove();

    updateDataToStorage();
}

function removeBookItem(bookItem){
    const bookPoisition = findBookIndex(bookItem[BOOK_ITEM]);
    books.splice(bookPoisition,1);
    bookItem.remove();

    const notifBook = document.querySelector(".notif-delete");
    document.body.classList.toggle('overflow');
    notifBook.style.display = 'block';
    
    updateDataToStorage();
}

function undoBookFromCompleted(bookItem){
    const uncompletedListBook = document.getElementById(UNCOMPLETED_BOOKSHELF);
    const undoJudul = bookItem.querySelector(".bookTitle").innerText;
    const undoAuthor = bookItem.querySelector(".author").innerText;
    const undoYear = bookItem.querySelector(".year").innerText;

    const newBook = makeBook(undoJudul, undoAuthor, undoYear, false);

    const book = findBook(bookItem[BOOK_ITEM]);
    book.isCompleted = false;
    newBook[BOOK_ITEM] = book.id;

    uncompletedListBook.append(newBook);
    bookItem.remove();
    updateDataToStorage();
}

function showEditDisplay(bookItem){
    const book = findBook(bookItem[BOOK_ITEM]);
    const wrapEdit = document.querySelector(".wrap-edit");
    document.body.classList.toggle('overflow');

    document.getElementById("edit-id").value = bookItem[BOOK_ITEM];
    document.getElementById("edit-judul").value = book.title;
    document.getElementById("edit-penulis").value = book.author;
    document.getElementById("edit-tahun").value = book.year;

    wrapEdit.style.display = 'block';

}

function saveEditBook (){
    const editWrap = document.querySelector(".wrap-edit");
    
    const idBook = document.getElementById("edit-id").value;
    const editJudul = document.getElementById("edit-judul").value;
    const editAuthor = document.getElementById("edit-penulis").value;
    const editYear = document.getElementById("edit-tahun").value;

    const bookPosition = findBookIndex(parseInt(idBook));

    books[bookPosition].title = editJudul;
    books[bookPosition].author = editAuthor;
    books[bookPosition].year = editYear;
    
    editWrap.style.display = 'none';
    document.body.classList.toggle('overflow');
    refreshDataFromBooks();
    updateDataToStorage();
}

function searchBook(){
    const kata = document.getElementById("input-search").value.toLowerCase();
    const uncompletedList = document.getElementById(UNCOMPLETED_BOOKSHELF);
    const completedList = document.getElementById(COMPLETED_BOOKSHELF);


    uncompletedList.innerHTML = "";
    completedList.innerHTML = "";

    if(kata == ''){
        refreshDataFromBooks();
        return;
    }

    for(book of books){
        if(book.title.toLowerCase().includes(kata)){
            const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
            newBook[BOOK_ITEM] = book.id;

            if(book.isCompleted){
                completedList.append(newBook);
            }else{
                uncompletedList.append(newBook);
            }
        }else{
            
        }
    }
}