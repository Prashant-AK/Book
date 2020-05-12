class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    static displayBooks(){
         const StoredBooks = [   
             {
                title: 'Book One',
                author: 'John Doe',
                isbn: '1234'
            },
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '1234'
            }
        ];
       const books = StoredBooks;
        books.forEach((book)=>UI.addBookToList(book))
    }
    static addBookToList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
                        `;
        list.appendChild(row);
    }
    static clearFields(){
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';        
    }
    static showAlertMessage(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            if(confirm("Are You Sure You want to delete this"))
            el.parentElement.parentElement.remove();
        }
    }
}

// Page Loades
document.addEventListener('DOMContentLoaded',UI.displayBooks());
//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(p)=>{
    p.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    // console.log(title+"--"+author+"--"+isbn);
    if(title === "" || author === "" || isbn === "")
    UI.showAlertMessage("Please Fill all the Fields","danger");
    else{
    const book = new Book(title,author,isbn);
    // console.log(book);
    UI.addBookToList(book); 
    UI.clearFields();
    UI.showAlertMessage("Book Added Successfully","success");
    }
})

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // delete book from UI
// console.log(e.target);
   UI.deleteBook(e.target);

    //delet book from localstorage
    // Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // show delete alert msg
    UI.showAlertMessage('Book Deleted Successfully', 'success');
})