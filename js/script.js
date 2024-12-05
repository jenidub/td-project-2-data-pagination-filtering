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
const searchBar = document.querySelector('.searchBar')

// /*
// Create the `showPage` function
// This function will create and insert/append the elements needed to display a "page" of nine students
// */
function showPage(pageNumber = 1) {
   studentList.innerHTML = ``
   // Select the index numbers for the students on that page
   let startIndex = (pageNumber - 1) * PER_PAGE_COUNT
   let endIndex = startIndex + PER_PAGE_COUNT
   console.log(startIndex, endIndex)

   // For loop to create and insert the individual student <li>
   for (let i = startIndex; i < endIndex; i++) {
      let studentInfo = data[i]
      let studentCard = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${studentInfo.picture.large}" alt="Profile Picture">
               <h3>${studentInfo.name.title}. ${studentInfo.name.first} ${studentInfo.name.last}</h3>
               <span class="email">${studentInfo.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${studentInfo.registered.date}</span>
            </div>
         </li>
      `
      studentList.insertAdjacentHTML('beforeend', studentCard)
   }
}

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

/* Page Button Click Event Handler Function */
linkList.addEventListener('click', (e) => {
   const buttonClicked = e.target
   buttonClicked.className = 'active'
   const buttonActive = linkList.querySelector('.active')
   buttonActive.className = ''
   const pageSelected = buttonClicked.textContent
   showPage(pageSelected)
})

// Call functions
showPage()
addPagination()