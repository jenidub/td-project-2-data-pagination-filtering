/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// GLOBAL VARIABLES
const PER_PAGE_COUNT = 9
const numberOfStudents = data.length

//LIST STATE VARIABLE
let currentPageView = data

//APPEND ELEMENTS
const studentList = document.querySelector('.student-list')
const linkList = document.querySelector('.link-list')
const searchBar = document.querySelector('.searchBar')

/* 
showSearch() Function:
this function dynamically inserts the search form under the h2 element in <header>
*/

function showSearch() {
   // Generate the HTML template literal for the search bar component per design team layout
   const searchBarElement = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `
   // Insert the search bar element HTML to the .searchBar element
   searchBar.insertAdjacentHTML("beforeend", searchBarElement)
}

/*
searchBar eventListener:
Listens for user keyboard entry and filters the student list based on the input text
*/

searchBar.addEventListener('keyup', (e) => {
   // Capture the user entered text and convert it to lower case to compare with the entries in data.json
   let searchText = e.target.value.toLowerCase()

   // Create a variable to store the students who match the searchText
   let filteredList = []

   // Iterate through data.json to find matches to the searchText value
   for (let i = 0; i < data.length; i++) {
      let studentInfo = data[i]
      
      // Create a string with student name and convert it to lower case to check for a match with searchText
      let studentName = `${studentInfo.name.first} ${studentInfo.name.last}`.toLowerCase()
      
      // If there is a match, add the studentInfo object to filteredList
      if (studentName.includes(searchText)) {
         filteredList.push(studentInfo)
      }
   }

   // After iterating through for matches, check filteredList for results
   // If empty, display a "No results" message
   if (filteredList.length === 0) {
      let html = `<h3>No results available in the student list</h3>`
      studentList.innerHTML = ``
      studentList.insertAdjacentHTML("beforeend", html)
   // If the filteredList length is smaller than the PER_PAGE_COUNT, send the whole array for showPage
   } else if (filteredList.length < PER_PAGE_COUNT) {
      showPage(filteredList)
   // If the filteredList length is larger than the PER_PAGE_COUNT, send the first PER_PAGE_COUNT entries to showPage() for display
   } else {
      showPage(filteredList.slice(0,PER_PAGE_COUNT))
   }

   // Use the filteredLength to create the updated number of page buttons
   addPagination(filteredList.length)

   // Store the filteredList to currentPageView to be accessed when the list buttons are clicked
   currentPageView = filteredList
})

/*
Create the `showPage` function:
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(studentData) {
   // Clear the studentList view prior to generating the page
   studentList.innerHTML = ``

   // Iterate through studentData (passed from appropriate function) to create the student card <li>
   // per design team layout
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
      // Insert the individual student Card element to the .studentList element
      studentList.insertAdjacentHTML('beforeend', studentCard)
   }
}

/* 
Create the `addPagination` function:
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(numberOfStudents) {
   // Clear the linkList buttons prior to generating the page
   linkList.innerHTML = ``

   //Calculate the number of buttons needed with numberOfStudents/PER_PAGE_COUNT
   const numberOfPages = Math.ceil(numberOfStudents/PER_PAGE_COUNT)

   //Iterate through the numberOfPages needed to create page number buttons
   for (let i = 1; i <= numberOfPages; i++) {
      let html = `<li><button>${i}</button></li>`
      linkList.insertAdjacentHTML("beforeend", html)
      // For the first button generated, assign it the 'active' class so it's highlighted
      if (i === 1) {
         const firstLI = linkList.querySelector('button')
         firstLI.classList.add('active')
      }
   }
}

/*
Page Button Click Event Handler Function
When the user clicks the button, the 'active' class is moved to the clicked button
and the page number in the button is passed to the showPage() function
*/

linkList.addEventListener('click', (e) => {
   // Check if the element that was clicked is a <button> element to changes on errant clicks
   if (e.target.tagName === 'BUTTON') {
      // Remove the class attribute 'active' from the previously active button
      const buttonActive = document.querySelector('.active')
      buttonActive.classList.remove("active")

      // Add the class attribute 'active' to the new active button (clicked)
      const buttonClicked = e.target
      buttonClicked.classList.add("active")

      // Capture the textContent with the page button number
      // to get the start and end index for the currentPageView list of student data
      const pageSelected = buttonClicked.textContent
      let startIndex = (pageSelected - 1) * PER_PAGE_COUNT
      let endIndex = (startIndex + PER_PAGE_COUNT)

      // Store the slice in studentInfo to pass to showPage()
      let studentInfo = currentPageView.slice(startIndex, endIndex)
      showPage(studentInfo)
   }
})

//Initial Page Load
// * Get first page of student data from data.json
// * Get totalStudentRecords to determine the number of page buttons needed
let firstPageStudents = data.slice(0, PER_PAGE_COUNT)
let totalStudentRecords = data.length

// Run showPage(), addPagination(), showSearch() functions based on the initial data state
showPage(firstPageStudents)
addPagination(totalStudentRecords)
showSearch()
