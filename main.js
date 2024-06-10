const title = document.getElementById("title")

const author = document.getElementById("author")

const Description = document.getElementById("Description")
const formL = document.querySelector("form")
const addbook = document.querySelector(".addbook")

let editIndex ;

let BookList = JSON.parse(localStorage.getItem("BookList")) || []
if(BookList){
    
    displayBooks(BookList)
}

formL.addEventListener("submit" , (e)=>{
e.preventDefault()
   
if(!title.value ||  !author.value || !Description.value){
        showMsg("please fill all files" , "danger")
    }else{
        if(addbook.value == "Add Book"){
            pushBooks()
            showMsg("Added Book successfully" , "success")
        }
        else{
               
            BookList[editIndex].Title =  title.value;
            BookList[editIndex].Description =  Description.value;
            BookList[editIndex].Author = author.value;
           addbook.value = "Add Book"
           displayBooks(BookList)
           showMsg("Edited Book successfully" , "success")
        }
       
    }
})

const showMsg = (message , className)=>{ 
   const div = document.createElement("div");
   div.innerText = message;
   div.className=` mt-3  alert alert-${className}`;
   div.style.width = "fit-content"
 formL.appendChild(div)
     setTimeout(() =>{ div.remove() },1000)
    
}



const pushBooks = ()=>{
    BookList.push({
Title: title.value,
Author: author.value,
Description: Description.value,
id:new Date().getTime()
})
  displayBooks(BookList)
}


function displayBooks (BookList){
    const tbody = document.querySelector("tbody");

    const  displayValues = BookList.map((item)=>{
      return `<tr>
   <td>${item.Title}</td>
       <td>${item.Author}</td>
       <td>${item.Description}</td>
      <td><a href="#" class="btn btn-danger delete me-3">Delete</a>
      <a href="#" class="btn btn-primary edit">Edit</a></td>
      </tr>`;
    })
    tbody.innerHTML = displayValues;
    localStorage.setItem("BookList", JSON.stringify(BookList))
  
      title.value = ""
      author.value = ""
  
      Description.value = ""
  deleteBtn()
  editBtn()
      
}


function deleteBtn (){
    const AllbtnDelete = document.querySelectorAll(".delete");
  
    AllbtnDelete.forEach((btn, idx)=>{
        btn.addEventListener("click", (e)=>{
            
            e.target.parentElement.parentElement.remove()
           
            BookList = BookList.filter((el=> el.id !== BookList[idx].id))
           showMsg(" book deleted" , "success");
           localStorage.setItem("BookList", JSON.stringify(BookList))
        })
    })
   
}
function editBtn () {
    const AllbtnEdit = document.querySelectorAll(".edit");


AllbtnEdit.forEach((btn , idx)=>{
    btn.addEventListener("click", ()=>{
       
     title.value = BookList[idx].Title;
     Description.value = BookList[idx].Description;
    author.value = BookList[idx].Author;
addbook.value = "Edit Book"
editIndex = idx

   
    })
})

}




