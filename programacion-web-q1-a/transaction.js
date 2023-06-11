document.addEventListener("DOMContentLoaded", function() {
    var selectedPlan = localStorage.getItem("selectedPlan");
    var selectedPrice = localStorage.getItem("selectedPrice");
  
    var selectedPlanElement = document.getElementById("selected-plan-container");
    var noPlanSelectedElement = document.getElementById("no-plan-selected");
  
    if (selectedPlan && selectedPrice) {
      var planNameElement = document.getElementById("plan-name");
      var planPriceElement = document.getElementById("plan-price");
  
      planNameElement.textContent = selectedPlan;
      planPriceElement.textContent = selectedPrice;
  
      selectedPlanElement.style.display = "block";
      noPlanSelectedElement.style.display = "none";
    } else {
      selectedPlanElement.style.display = "none";
      noPlanSelectedElement.style.display = "block";
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    var selectedPlan = localStorage.getItem("selectedPlan");
    var selectedPrice = localStorage.getItem("selectedPrice");
  
    var selectedPlanInfo = document.getElementById("selected-plan-info");
    
    console.log(deletePlanIcon)
  
    if (selectedPlan && selectedPrice) {
      selectedPlanInfo.innerHTML = `
        <h3>${selectedPlan}</h3>
        <p>Precio: ${selectedPrice}</p>
        <a id="delete-plan-icon" class="delete-icon" href="#"></a>
      `;
      var deletePlanIcon = document.getElementById("delete-plan-icon");
      deletePlanIcon.addEventListener("click", function() {
        var confirmDelete = confirm(
          "Are you sure you want to remove the subscription plan from your shopping cart?"
        );
        location.reload();
        if (confirmDelete) {
          localStorage.removeItem("selectedPlan");
          localStorage.removeItem("selectedPrice");
          selectedPlanInfo.innerHTML = "";
          deletePlanIcon.style.display = "none";
          showNoPlanMessage();
        }
      });
  
      deletePlanIcon.style.display = "block";
    } else {
      showNoPlanMessage();
    }
  });
  
  function showNoPlanMessage() {
    var noPlanMessage = document.getElementById("no-plan-message");
    var choosePlanButton = document.getElementById("choose-plan-button");
  
    noPlanMessage.style.display = "block";
    choosePlanButton.addEventListener("click", function() {
      window.location.href = "suscripciones.html";
    });
  }
  
  function processPayment(event) {
    event.preventDefault();
  
    const form = event.target;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
  
    // Obtener los valores de los campos del formulario
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVC = document.getElementById('card-cvc').value;
  
    // Validar los campos del formulario
    if (!isValidCardNumber(cardNumber)) {
      displayErrorMessage('Please enter a valid card number.');
      alert('Please enter a valid card number.');
      return;
    }
  
    if (!isValidCardExpiry(cardExpiry)) {
      displayErrorMessage('Please enter a valid expiration date (MM/YY).');
      alert('Please enter a valid expiration date (MM/YY).');
      return;
    }
  
    if (!isValidCardCVC(cardCVC)) {
      displayErrorMessage('Please enter a valid CVC (3 digits).');
      alert('Please enter a valid CVC (3 digits).');
      return;
    }
  
    // Simulación de procesamiento de la transacción
    simulateProcessing()
      .then(() => {
        // Simulación de éxito o error aleatorio
        const successProbability = 0.92; // Probabilidad de éxito de la transacción (80% en este caso)
        const random = Math.random();
  
        if (random < successProbability) {
          displaySuccessMessage('Payment successful! Thank you for your purchase.');
          alert('Payment successful! Thank you for your purchase.');
          // Aquí puedes agregar la lógica adicional para realizar acciones después de un pago exitoso
          // Por ejemplo, actualizar la base de datos, enviar un correo electrónico de confirmación, etc.
        } else {
          displayErrorMessage('Payment failed. Please try again later.');
          alert('Payment failed due to high volume of transaction at the time. Please try again later.');
          // Aquí puedes agregar la lógica adicional para manejar un pago fallido
          // Por ejemplo, mostrar un mensaje de error, permitir al usuario volver a intentar el pago, etc.
        }
      })
      .catch((error) => {
        // Error al procesar la transacción
        console.error('Error processing payment:', error);
        displayErrorMessage('An error occurred while processing the payment. Please try again later.');
        alert('An error occurred while processing the payment. Please try again later.');
      })
      .finally(() => {
        // Limpiar los campos del formulario después de la transacción
        form.reset();
        form.classList.remove('was-validated');
      });
  }
  
  
  function isValidCardNumber(cardNumber) {
    // Validar que el número de tarjeta tenga entre 13 y 18 dígitos
    return /^\d{13,18}$/.test(cardNumber);
  }
  
  function isValidCardExpiry(cardExpiry) {
    // Validar que la fecha de expiración tenga el formato MM/YY
    return /^\d{2}\/\d{2}$/.test(cardExpiry);
  }
  
  function isValidCardCVC(cardCVC) {
    // Validar que el CVC tenga exactamente 3 dígitos
    return /^\d{3}$/.test(cardCVC);
  }
  
  function displayErrorMessage(message) {
    // Mostrar mensaje de error en el formulario
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
  }
  
  function displaySuccessMessage(message) {
    // Mostrar mensaje de éxito en el formulario
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = message;
    successMessageElement.style.display = 'block';
  }
  
  function simulateProcessing() {
    // Simulación de procesamiento de la transacción con un retardo de 2 segundos
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
  
  const paymentForm = document.getElementById('payment-form');
  paymentForm.addEventListener('submit', processPayment);
  
  
  const deletePlanIcon = document.getElementById('delete-plan-icon');
  deletePlanIcon.addEventListener('click', deletePlan);
  
  function deletePlan(event) {
    event.preventDefault();
  
    if (confirm('Are you sure you want to remove the selected plan from the shopping cart?')) {
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('selectedPrice');
  
      location.reload();
    }
  }
  