// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Cuenta demo
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");
const accountPanel = document.getElementById("accountPanel");
const accountEmail = document.getElementById("accountEmail");
const logoutButton = document.getElementById("logoutButton");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    registerMessage.textContent = "Las contraseñas no coinciden.";
    registerMessage.style.color = "red";
    return;
  }

  localStorage.setItem("demoUser", email);

  registerForm.classList.add("hidden");
  accountPanel.classList.remove("hidden");
  accountEmail.textContent = Sesión iniciada como: ${email};
  registerMessage.textContent = "";
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("demoUser");
  accountPanel.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("demoUser");

  if (savedUser) {
    registerForm.classList.add("hidden");
    accountPanel.classList.remove("hidden");
    accountEmail.textContent = Sesión iniciada como: ${savedUser};
  }
});

// Suscripciones y modal de pago
const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");
const selectedPlan = document.getElementById("selectedPlan");
const paymentMessage = document.getElementById("paymentMessage");
const nequiPayment = document.getElementById("nequiPayment");
const cardPayment = document.getElementById("cardPayment");

let currentPlan = "";
let currentPrice = 0;

document.querySelectorAll(".subscribe").forEach((button) => {
  button.addEventListener("click", () => {
    currentPlan = button.dataset.plan;
    currentPrice = Number(button.dataset.price);

    selectedPlan.textContent = `Plan seleccionado: ${currentPlan} — $${currentPrice.toLocaleString(
      "es-CO"
    )} COP / mes`;

    paymentModal.classList.remove("hidden");
    paymentMessage.textContent = "";
  });
});

closeModal.addEventListener("click", () => {
  paymentModal.classList.add("hidden");
});

paymentModal.addEventListener("click", (event) => {
  if (event.target === paymentModal) {
    paymentModal.classList.add("hidden");
  }
});

// Cambiar método de pago
document.querySelectorAll(".method").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".method")
      .forEach((item) => item.classList.remove("active"));

    button.classList.add("active");

    if (button.dataset.method === "nequi") {
      nequiPayment.classList.remove("hidden");
      cardPayment.classList.add("hidden");
    } else {
      nequiPayment.classList.add("hidden");
      cardPayment.classList.remove("hidden");
    }
  });
});

// Pago con tarjeta: solo demostración
cardPayment.addEventListener("submit", (event) => {
  event.preventDefault();

  paymentMessage.textContent =
    "Pago simulado registrado. En una versión real debes integrar un procesador de pagos seguro.";
  paymentMessage.style.color = "green";

  cardPayment.reset();
});
