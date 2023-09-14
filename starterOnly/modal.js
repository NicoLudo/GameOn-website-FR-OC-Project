// Function to toggle the responsive class on the navigation menu
function editNav() {
  // Get the element
  const x = document.getElementById('myTopnav');
  // Toggle the responsive class on off
  x.classList.toggle('responsive');
}

// DOM Elements
// Store various elements from the HTML for later manipulation
const modalbg = document.querySelector(`.bground`);
const modalBtn = document.querySelectorAll(`.modal-btn`);
const formData = document.querySelectorAll(`.formData`);
const closeBtn = document.querySelector(`.close`);
const closeThankyouBtn = document.querySelector(`.close-btn`);
const modalContent = document.querySelector('.content');
const form = document.querySelector(".form");
const topContainer = document.querySelector(".top-container");
const middleContainer = document.querySelector(".middle-container");
const bottomContainer = document.querySelector(".bottom-container");
const modalBody = document.querySelector(".modal-body");

// Event to launch modal on clicking any modal button
modalBtn.forEach((btn) => btn.addEventListener(`click`, launchModal));

// Function to display the modal
function launchModal() {
  modalbg.style.display = 'flex';
  modalbg.style.opacity = '1';
  modalbg.style.transform = 'translateY(0)';
}

// Function to close the modal
function closeModal() {
  modalContent.classList.add('slide-out');

  // Listen for the end of the animation
  modalContent.addEventListener('animationend', function resetAnimation() {
    modalbg.style.display = 'none';
    modalContent.classList.remove('slide-out');
    modalContent.removeEventListener('animationend', resetAnimation);
  });
}

// Event listeners for closing the modal
[closeBtn, closeThankyouBtn].forEach(btn => btn?.addEventListener('click', closeModal));

// // Form

// Regular expression pattern for name
const namePattern = /^[a-zA-Z\u00C0-\u00FF]+(?:[a-zA-Z\u00C0-\u00FF]|\-(?![\-])| (?![ ]))*[a-zA-Z\u00C0-\u00FF]+$/;

// Function to validate the name
function validateName(name) {
  return namePattern.test(name) && name !== '-' && name.length >= 2;
}

// Function to validate email address
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Function to validate age (between 18 to 100 years)
function validateBirthdate(birthdate) {
  // Check if the date is empty or undefined
  if (!birthdate) {
    return false;
  }

  const birthDateObj = new Date(birthdate);

  // Check if the date is invalid
  if (isNaN(birthDateObj)) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  const birthYear = birthDateObj.getFullYear();

  const age = currentYear - birthYear;
  return age >= 18 && age <= 100;
}

// Function to validate the quantity
function validateQuantity(quantity) {
  return !(!quantity.trim() || isNaN(quantity) || quantity < 0 || quantity > 99);
}

// Main function to validate form before submission
function validate(event) {
  // Prevent page reload on form submission
  event.preventDefault();

  // Clear error messages
  document.getElementById("error-first").textContent = '';
  document.getElementById("error-last").textContent = '';
  document.getElementById("error-email").textContent = '';
  document.getElementById("error-birthdate").textContent = '';
  document.getElementById("error-quantity").textContent = '';
  document.getElementById("error-location").textContent = '';
  document.getElementById("error-terms").textContent = '';

  const errors = [];
  // Fetch values from the form
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const locationSelected = document.querySelector("input[name='location']:checked");
  const terms = document.getElementById("checkbox1").checked;

  // Configuration for all the validation checks
  const validationConfig = [
    { validate: validateName, value: firstName, element: "error-first", message: 'Le prénom est incorrect' },
    { validate: validateName, value: lastName, element: "error-last", message: 'Le nom est incorrect' },
    { validate: validateEmail, value: email, element: "error-email", message: 'Email invalide' },
    { validate: validateBirthdate, value: birthdate, element: "error-birthdate", message: 'Date de naissance invalide (entre 18 et 100 ans)' },
    { validate: validateQuantity, value: quantity, element: "error-quantity", message: 'Nombre de tournois invalide (entre 0 et 99)' },
    { validate: (value) => value, value: locationSelected, element: "error-location", message: 'Lieu non sélectionné' },
    { validate: (value) => value, value: terms, element: "error-terms", message: 'Conditions non acceptées' },
  ];

  // Check each field and collect errors if any
  validationConfig.forEach(config => {
    if (!config.validate(config.value)) {
      errors.push({ element: config.element, message: config.message });
    }
  });

  function handleSuccess() {
    // Hide the form and display a thank you message
    form.style.display = "none";
    topContainer.style.display = "flex";
    middleContainer.style.display = "flex";
    bottomContainer.style.display = "flex";
    modalBody.classList.add("flex-display-modal-body");
  }

  // Display error messages for invalid form input
  function handleErrors(errors) {
    errors.forEach(error => {
      document.getElementById(error.element).textContent = error.message;
    });
  }

  // If no errors, show success, else display the error messages
  if (errors.length === 0) {
    handleSuccess();
  } else {
    handleErrors(errors);
  }
}
