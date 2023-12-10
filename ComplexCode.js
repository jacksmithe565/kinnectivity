/*
Filename: ComplexCode.js

Description: This code demonstrates an advanced web page with dynamic content and interactive features. It includes a responsive layout, form validation, data manipulation, and event handling.

*/

// Main function to initialize the web page
function init() {
  // Load data from server and populate the page
  fetchData()
    .then((data) => {
      populatePage(data);
      setupEventListeners();
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      displayErrorMessage("Failed to load data.");
    });
}

// Fetch data from the server
function fetchData() {
  return new Promise((resolve, reject) => {
    // Send an asynchronous HTTP request to retrieve data
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// Populate the web page with data
function populatePage(data) {
  // Update the header
  const header = document.getElementById("header");
  header.innerHTML = `<h1>Welcome, ${data.fullName}!</h1>`;

  // Render user profile section
  const userProfile = document.getElementById("userProfile");
  userProfile.innerHTML = `
    <img src="${data.avatarUrl}" alt="Profile Picture" />
    <div>
      <h2>${data.fullName}</h2>
      <p>Email: ${data.email}</p>
      <p>Location: ${data.location}</p>
    </div>
  `;

  // Render last 5 orders
  const ordersList = document.getElementById("ordersList");
  data.orders.slice(0, 5).forEach((order) => {
    const orderItem = document.createElement("li");
    orderItem.innerHTML = `
      <h3>${order.orderId}</h3>
      <p>Products: ${order.products.join(", ")}</p>
      <p>Total: $${order.total}</p>
    `;
    ordersList.appendChild(orderItem);
  });

  // Show success message
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = "Data loaded successfully.";
  successMessage.style.display = "block";
}

// Setup event listeners for form validation and submit button
function setupEventListeners() {
  const form = document.getElementById("form");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");

  // Prevent default form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  // Validate input fields on blur
  firstNameInput.addEventListener("blur", () => {
    validateName(firstNameInput);
  });

  lastNameInput.addEventListener("blur", () => {
    validateName(lastNameInput);
  });

  emailInput.addEventListener("blur", () => {
    validateEmail(emailInput);
  });

  // Submit form on button click
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", () => {
    const isValid = validateForm();
    if (isValid) {
      submitForm();
    }
  });
}

// Validate a name input field
function validateName(input) {
  const nameRegex = /^[a-zA-Z]+$/;
  const inputValue = input.value.trim();

  if (!nameRegex.test(inputValue)) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

// Validate an email input field
function validateEmail(input) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const inputValue = input.value.trim();

  if (!emailRegex.test(inputValue)) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

// Validate the entire form
function validateForm() {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");

  validateName(firstNameInput);
  validateName(lastNameInput);
  validateEmail(emailInput);

  return (
    !firstNameInput.classList.contains("invalid") &&
    !lastNameInput.classList.contains("invalid") &&
    !emailInput.classList.contains("invalid")
  );
}

// Submit the form
function submitForm() {
  const form = document.getElementById("form");
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  // Send form data to the server
  fetch("https://api.example.com/submit", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        displaySuccessMessage("Form submitted successfully!");
      } else {
        displayErrorMessage("Failed to submit form.");
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      displayErrorMessage("Failed to submit form.");
    });
}

// Display a success message
function displaySuccessMessage(message) {
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message;
  successMessage.style.display = "block";
}

// Display an error message
function displayErrorMessage(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Start the web page initialization
init();