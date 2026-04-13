let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const deletedRowMessage = document.getElementById("deleted-row-message");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function addNewBook(event) {
  //Prevent the page from refreshing
  event.preventDefault();

  const titleInputValue = titleInput.value.toString().trim();
  const authorInputValue = authorInput.value.toString().trim();
  if (
    titleInputValue === "" ||
    pagesInput.value === "" ||
    authorInputValue === ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    const book = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      checkInput.checked
    );
    myLibrary.push(book);
    render();
    // Clear the form after adding
    document.getElementById("bookForm").reset();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tableBody = document.querySelector("#display tbody");

  //clear old table
  tableBody.innerHTML = "";

  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeButton = document.createElement("button");
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    let readStatus = "";
    myLibrary[i].check ? (readStatus = "Yes") : (readStatus = "No");
    changeButton.innerText = readStatus;

    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const deleteButton = document.createElement("button");
    deleteCell.appendChild(deleteButton);
    deleteButton.className = "btn btn-warning";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      deletedRowMessage.classList.remove("hidden-deleted-message");
      deletedRowMessage.innerText = `You've deleted the book: ${myLibrary[i].title}`;
      // Hide it after 3 seconds
      setTimeout(() => {
        deletedRowMessage.classList.add("hidden-deleted-message");
      }, 3000);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
