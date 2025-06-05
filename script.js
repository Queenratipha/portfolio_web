document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("form-status");

  if (!name || !email || !message) {
    status.textContent = "Please fill in all fields.";
    status.style.color = "red";
    return;
  }

  // Simulate sending the message
  status.textContent = "Sending...";
  setTimeout(() => {
    status.textContent = "Message sent successfully!";
    status.style.color = "#00ffcc";

    // Clear the form
    document.getElementById("contact-form").reset();
  }, 1000);
});
<script>
  document.getElementById('backBtn').onclick = function() {
    window.history.back()
  }";
  
  "document.getElementById('homeBtn').;
</script>