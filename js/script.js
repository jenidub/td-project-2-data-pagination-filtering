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

/*
Create the searchBar function:
This will dynamically insert the search form under the Students h2 element
*/

function showSearch() {
   const searchBarElement = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `
   searchBar.insertAdjacentHTML("beforeend", searchBarElement)
}

searchBar.addEventListener('keyup', (e) => {
   let searchText = e.target.value.toLowerCase()
   console.log("searchText: ", searchText)
   let filteredList = []

   for (let i = 0; i < data.length; i++) {
      let studentInfo = data[i]
      let studentName = `${studentInfo.name.title}. ${studentInfo.name.first} ${studentInfo.name.last}`.toLowerCase()
      if (studentName.includes(searchText)) {
         filteredList.push(studentInfo)
      }
   }

   if (filteredList.length === 0) {
      let html = `<h3>No results available in the student list</h3>`
      studentList.innerHTML = ``
      studentList.insertAdjacentHTML("beforeend", html)
   } else if (filteredList.length < PER_PAGE_COUNT) {
      showPage(filteredList)
   } else {
      showPage(filteredList.slice(0,PER_PAGE_COUNT + 1))
   }

   addPagination(filteredList.length)
})

/*
Create the `showPage` function:
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(studentData) {
   studentList.innerHTML = ``

   // For loop to create and insert the individual student <li>
   for (let i = 0; i < studentData.length; i++) {

      let studentInfo = studentData[i]
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
Create the `addPagination` function:
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(numberOfStudents) {
   linkList.innerHTML = ``
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
   console.log(linkList)
}

/*
Page Button Click Event Handler Function
When the user clicks the button, the 'active' class is moved to the clicked button
and the page number in the button is passed to the showPage() function
*/

linkList.addEventListener('click', (e) => {
   /*BUG: Class name is not moving between buttons */
   if (e.target.tagName === 'BUTTON') {
      const buttonClicked = e.target
      buttonClicked.className = 'active'
      const buttonActive = linkList.querySelector('.active')
      buttonActive.className = ''
      const pageSelected = buttonClicked.textContent
   
      let startIndex = (pageSelected - 1) * PER_PAGE_COUNT
      let endIndex = (startIndex + PER_PAGE_COUNT)
      let studentInfo = data.slice(startIndex, endIndex)
   
      showPage(studentInfo)
   }
})

// Call functions
let firstPageStudents = data.slice(0, PER_PAGE_COUNT)
let totalStudentRecords = data.length

showPage(firstPageStudents)
addPagination(totalStudentRecords)
showSearch()
