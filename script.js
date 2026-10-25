const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const stepButtons = document.querySelectorAll('.sidebar-step');
const stepPanels = document.querySelectorAll('.step-panel');
const progressText = document.querySelector('.form-progress');
const stepIndicator = document.querySelector('.step-indicator');
const title = document.querySelector('.application-form-wrap h2');
const buttonText = document.querySelector('.continue-button');

const stepTitles = [
  'Basic Info',
  'Business Details',
  'Product Info',
  'Technical & Marketing'
];

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedStep = Number(button.dataset.step);

    stepButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    stepPanels.forEach((panel) => panel.classList.toggle('active', Number(panel.dataset.panel) === selectedStep));

    const stepNumber = selectedStep + 1;
    if (progressText) progressText.textContent = `STEP ${stepNumber} OF 4 — ${stepTitles[selectedStep].toUpperCase()}`;
    if (stepIndicator) stepIndicator.textContent = `STEP ${stepNumber} OF 4`;
    if (title) title.textContent = stepTitles[selectedStep];
    if (buttonText) buttonText.textContent = selectedStep === 3 ? 'SUBMIT →' : 'CONTINUE →';
  });
});

const registerForm = document.getElementById('registerForm');
const formMessage = document.getElementById('formMessage');

if (registerForm && formMessage) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'company'];
    const missing = requiredFields.filter((field) => !String(data[field] || '').trim());

    if (missing.length) {
      formMessage.textContent = 'Please complete all required fields.';
      formMessage.className = 'form-message error';
      return;
    }

    let savedApplications = JSON.parse(localStorage.getItem('novatechApplications') || '[]');
    savedApplications.push({
      ...data,
      submittedAt: new Date().toISOString()
    });

    localStorage.setItem('novatechApplications', JSON.stringify(savedApplications));

    formMessage.textContent = 'Application submitted successfully. We will contact you soon.';
    formMessage.className = 'form-message success';
    registerForm.reset();
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
