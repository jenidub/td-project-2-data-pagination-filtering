# Membership Directory Display App

## Overview
The Membership Directory Display App is a JavaScript-based web application designed to display a paginated list of student members. It allows users to view detailed information about each member, filter members by name using a search bar, and navigate through pages with pagination buttons.

## Features
1. **Dynamic Student List Display:**
   - Displays students in a card format with their name, email, profile picture, and registration details.
2. **Search Functionality:**
   - Users can search for members by their first or last name.
   - Displays "No results" message when no match is found.
3. **Pagination:**
   - Automatically divides the list of students into pages, with nine students per page.
   - Includes dynamic navigation buttons for easy page switching.

## Project Structure
```
project-directory/
|-- index.html     # Main HTML file containing the structure of the application
|-- script.js      # Contains the core logic for DOM manipulation and functionality
|-- data.js        # JSON-like JavaScript file containing sample student data
|-- css/           # Folder containing the styling for the application
    |-- reset.css  # Reset styles
    |-- styles.css # Custom styles for the application
```

## Files

### 1. `index.html`
- The main HTML file defines the layout and structure of the application.
- Key sections:
  - **Header:** Displays the title "Students" and contains the dynamically added search bar.
  - **Student List:** An empty `ul` element where student cards are dynamically rendered.
  - **Pagination:** An empty `ul` element where pagination buttons are dynamically rendered.

### 2. `script.js`
- Implements the application logic using JavaScript DOM manipulation.
- Functions:
  - `showSearch()`: Dynamically generates the search bar component.
  - `showPage(studentData)`: Displays a specified subset of student data on the page.
  - `addPagination(numberOfStudents)`: Creates and appends pagination buttons based on the total number of students.
  - Event listeners for search functionality and pagination button clicks.
- Global variables:
  - `PER_PAGE_COUNT`: Defines the number of students per page (default is 9).
  - `currentPageView`: Holds the filtered or unfiltered list of students currently being displayed.

### 3. `data.js`
- Contains an array of student objects with the following properties:
  - `name`: An object with `title`, `first`, and `last` fields.
  - `email`: The student's email address.
  - `registered`: An object containing the registration date and age.
  - `picture`: An object with URLs for profile pictures in different resolutions.

## How to Use

1. **View Student Information:**
   - Students are displayed in a card format with their profile picture, name, email, and registration details.

2. **Search for Students:**
   - Type a name in the search bar to filter the list.
   - If no matches are found, a "No results" message will appear.

3. **Navigate Between Pages:**
   - Use the pagination buttons at the bottom to switch between pages.
   - The current page button is highlighted.

## Customization Available
- **Change Items Per Page:**
  - Modify the `PER_PAGE_COUNT` constant in `script.js` to change the number of students displayed per page.

## License
- This project is for educational purposes and part of the Treehouse Techdegree program.
- The README file was created with the assistance of ChatGPT.
