// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
};

// Initialize EmailJS
(function(){
    emailjs.init("zqcMWpx3ZgSue9iRA"); // Replace with your EmailJS user ID
})();

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('Mobile').value; 
    const subject = document.querySelector('input[placeholder="Email Subject"]').value;
    const messageContent = document.getElementById('Message').value;

    // Basic validation (you can expand this as needed)
    if (!name || !email || !messageContent) {
        alert('Please fill in all required fields.');
        return;
    }

    // Format the message to include additional details
    const fullMessage = `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Subject: ${subject}
        
        Message:
        ${messageContent}
    `;

    // Send email
    emailjs.send("service_gmail", "template_jonybd3", {
        to_name: 'Harsh Prajapti',
        from_name: 'Your Portfolio',
        from_email: email, // Include the email address
        message: fullMessage,
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert('Message sent successfully!');
        // Clear the form
        document.getElementById('contactForm').reset();
    }, function(error) {
        console.log("FAILED...", error);
        alert('Failed to send message. Please try again.');
    });
});
