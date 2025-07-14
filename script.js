function openPopup() {
    document.getElementById('popupSection').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    document.getElementById('popupSection').classList.remove('active');
    document.body.style.overflow = '';
  }

  function submitForm() {
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const eventType = document.getElementById('eventType').value;
    const guests = document.getElementById('guests').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventLocation = document.getElementById('eventLocation').value;

    // Basic validation
    if (!name || !phone || !email) {
      alert('Please fill in all contact information fields.');
      return;
    }

    // Here you would typically send the data to your server
    alert('Thank you for your inquiry! We will get back to you soon.');
    closePopup();
    
    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('eventType').value = '';
    document.getElementById('guests').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventLocation').value = '';
  }

  // Close popup when clicking outside
  document.getElementById('popupSection').addEventListener('click', function(e) {
    if (e.target === this) {
      closePopup();
    }
  });

  // Close popup with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePopup();
    }
  });


   const popup = document.getElementById("popupForm");
    const openBtn = document.getElementById("openFormBtn");
    const closeBtn = document.getElementById("closeFormBtn");

    openBtn.addEventListener("click", () => {
      popup.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    document.getElementById("budget").addEventListener("input", function () {
      document.getElementById("budgetDisplay").textContent = "₦" + Number(this.value).toLocaleString();
    });

    document.getElementById("eventForm").addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("successMessage").style.display = "block";
    });






 const cookingPopupModal = document.getElementById("popUpForm");
  const openCookingFormBtn = document.getElementById("contactBtn");
  const closeCookingFormBtn = document.getElementById("closeCookingFormBtn");
  const cookingForm = document.getElementById("cookingForm");
 

  openCookingFormBtn.addEventListener("click", () => {
    cookingPopupModal.style.display = "flex";
  });

  closeCookingFormBtn.addEventListener("click", () => {
    cookingPopupModal.style.display = "none";
    document.getElementById("successMessage").style.display = "none";
    cookingForm.reset();
  });

  cookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("successMessage").style.display = "block";
    cookingForm.scrollIntoView({ behavior: "smooth" });
  });


  

document.getElementById('orderBtn').addEventListener('click', function() {
    window.location.href = 'order.html';
});
