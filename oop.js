class Book {
    constructor(title, author, description , id) {
      this.title = title;
      this.author = author;
      this.description = description;
      this.id = id
    }
  }


  class Store{


    static  getAllbooks(){
        
        let  BookList = JSON.parse(localStorage.getItem("BookList")) || [];
     
      return BookList
       
    }
    static setAllbooks(book){
      const books= Store.getAllbooks()
      
      if(book){
        books.push(book)
      }
      
      
      localStorage.setItem("BookList" , JSON.stringify(books))
      return books
    }
    
   }

  class Display{
  
    static editIndex = null;

    static displayAllbooks(){
      const books = Store.setAllbooks();
      
      document.querySelector("tbody").innerHTML = ""
      books.forEach(book=> {
        Display.displayBooks(book)
      });
      
      
        }
        static   displayBooks (book){
 
 
          const tbody = document.querySelector("tbody");
     
         tbody.innerHTML += `<tr>
       <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.description}</td>
          <td><a href="#" class="btn btn-danger delete me-3 ">Delete</a>
          <a href="#" class="btn btn-primary edit">Edit</a></td>
          </tr>`;
        
            title.value = ""
            author.value = ""
        
            Description.value = ""
    
            const allbtnDelete = tbody.querySelectorAll(".delete")
            const allbtnEdit = tbody.querySelectorAll(".edit")
            Display.deleteBtn(allbtnDelete)
            Display.editBtn(allbtnEdit)
        }
     




  static  showMsg(message , className){
        const div = document.createElement("div");
        div.innerText = message;
        div.className=` mt-3  alert alert-${className}`;
        div.style.width = "fit-content"
        document.querySelector("form").appendChild(div)
          setTimeout(() =>{ div.remove() },1000)
    }

  static  editBtn(allbtnEdit){
   
   
      const books = Store.setAllbooks()
     allbtnEdit.forEach((btn , idx)=>{
        btn.addEventListener("click", ()=>{
           
         title.value = books[idx].title;
         Description.value = books[idx].description;
        author.value = books[idx].author;
       document.querySelector(".addbook").value = "Edit Book"
   Display.editIndex = idx; 
  
        })
    })
    }


    static  deleteBtn (allbtnDelete){
   


      allbtnDelete.forEach((btn , idx)=>{
      
        btn.addEventListener("click", ()=>{
          btn.parentElement.parentElement.remove()
         Display.showMsg(" book deleted" , "success");
         
         let books = Store.setAllbooks();
         books = books.filter((el=> el.id !== books[idx].id))
         localStorage.setItem("BookList", JSON.stringify(books))
        })
      })
      
        }
 
  }
  
 
   Display.displayAllbooks()

  document.querySelector("form").addEventListener("submit" , (e)=>{
    e.preventDefault()

    const title = document.getElementById("title")

const author = document.getElementById("author")

const Description = document.getElementById("Description")


if(!title.value ||  !author.value || !Description.value){
Display.showMsg("please fill all files" , "danger")
}else{

  if(document.querySelector(".addbook").value == "Add Book"){
  
   const book = new Book(title.value , author.value , Description.value , new Date().getTime())
   
  Display.displayBooks(book)
  Store.setAllbooks(book)
   Display.showMsg("Added Book successfully" , "success")
}else{
const editIndex = Display.editIndex;
const books = Store.setAllbooks();

books[editIndex].title =  title.value;
            books[editIndex].description =  Description.value;
            books[editIndex].author = author.value;
            document.querySelector(".addbook").value = "Add Book"
            
            localStorage.setItem("BookList", JSON.stringify(books))
           
            Display.displayAllbooks()
          Display.showMsg("Edited Book successfully" , "success")
}
}
})



