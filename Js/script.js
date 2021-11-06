document.addEventListener("DOMContentLoaded", ()=>{
    const submitForm = document.getElementById("form");
    const editBook = document.getElementById("form-edit");
    const cancelEdit = document.querySelector(".edit-cancel");
    const searchBookForm = document.getElementById("form-search-buku");
    const notifDeleted = document.getElementById("notif-oke");

    submitForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        addBook();
    });

    editBook.addEventListener("submit", function(event){
        event.preventDefault();
        saveEditBook();
    });

    cancelEdit.addEventListener("click", function(event){
        event.preventDefault();
        document.querySelector(".wrap-edit").style.display ='none';
        document.body.classList.toggle('overflow');
    });

    notifDeleted.addEventListener("click", function(event){
        event.preventDefault();
        document.querySelector(".notif-delete").style.display = "none";
        document.body.classList.toggle('overflow');
    });

    searchBookForm.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
});