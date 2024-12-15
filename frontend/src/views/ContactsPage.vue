<template>
    <div id="contact-page">
      <main id="main-container-contact">
        <div id="contact-info">
          <p>Feel free to reach out to us!</p>
          <p><strong>Email:</strong> <a href="mailto:oskar.mannik@ut.ee">oskar.mannik@ut.ee</a></p>
          <p><strong>Phone:</strong> <a href="tel:+37251869985">+372 518 69985</a></p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactPage",
  };
  </script>
  
<style>
#contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #121212;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
}


#main-container-contact {
  text-align: center;
  padding: 1.5rem; 
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 90%;
  margin: 1rem; 
}

/* Contact Info */
#contact-info p {
  margin: 0.75rem 0; 
  font-size: 1.1rem;
  line-height: 1.4;
}

#contact-info strong {
  color: #00bcd4;
}

a {
  color: #00bcd4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>
  