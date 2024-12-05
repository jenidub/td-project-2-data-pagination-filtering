/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// GLOBAL VARIABLES
const PER_PAGE_COUNT = 9
const numberOfStudents = data.length

//APPEND ELEMENTS
const studentList = document.querySelector('.student-list')
const linkList = document.querySelector('.link-list')

// /*
// Create the `showPage` function
// This function will create and insert/append the elements needed to display a "page" of nine students
// */
// function showPage(){
//    /* Pseudocode
//    - select the 
//    */
// }


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination() {
   // - how many buttons? divide number of students by page count
   const numberOfPages = Math.ceil(numberOfStudents/PER_PAGE_COUNT)
   // - for loop to create the button elements w/ numberOfStudents
   for (let i = 1; i <= numberOfPages; i++) {
      // => create html markup string for each button with index + 1
      let html = `<li><button>${i}</button></li>`
      // => insertAdjacentHTML to ul link-list
      linkList.insertAdjacentHTML("beforeend", html)
      // for button #1: add className active      
      if (i === 1) {
         const firstLI = linkList.querySelector('button')
         firstLI.className = 'active'
      }
   }
}

// Call functions
// showPage()
addPagination()