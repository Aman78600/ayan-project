document.getElementById('submit_Button_Inquiry').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    inquiry_close();
    // Clear previous error messages
    document.getElementById('in_name_error').textContent = '';
    document.getElementById('in_phone_error').textContent = '';

    // Get form data
    var name = document.getElementById('in_name').value.trim();
    var phone = document.getElementById('in_phone').value.trim();
    var message = document.getElementById('in_message').value.trim();

    let isValid = true;

    if (name === '') {
        document.getElementById('in_name_error').textContent = '*Name is required*';
        isValid = false;
    }

    if (!(/^\d{10}$/.test(phone))) {
        document.getElementById('in_phone_error').textContent = '*Please enter a valid 10-digit phone number*';
        isValid = false;
    }

    if (isValid) {
        send_inquiry_data(name, phone, message);
    }
});

function send_inquiry_data(name, phone, message) {
    let templateParams = {
        user_name: name,
        user_phone: phone,
        user_message: message
    };

    emailjs.send('service_mfb2kdn', 'template_9fllykf', templateParams) // Replace with your EmailJS service ID and template ID
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your inquiry has been sent successfully!');

            // Clear form fields after successful submission
            document.getElementById('in_name').value = '';
            document.getElementById('in_phone').value = '';
            document.getElementById('in_message').value = '';
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong with EmailJS.');
        });
}