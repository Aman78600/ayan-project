document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('vehicleNumberError').textContent = '';
    document.getElementById('timeError').textContent = '';

    // Get form data
    var name = document.getElementById('appitment_name').value.trim();
    var phone = document.getElementById('appitment_phone').value.trim();
    var date = document.getElementById('reservation-date').value.trim();
    var person = document.getElementById('person').value.trim();
    var vehicle_number = document.getElementById('vahicule_number').value.trim();
    var time = document.getElementById('time').value.trim();

    let isValid = true;

    if (name === '') {
        document.getElementById('nameError').classList.remove('dont_show');
        document.getElementById('nameError').textContent = '*Name is required*';
        isValid = false;
    }

    if (!(/^\d{10}$/.test(phone))) {
        document.getElementById('phoneError').classList.remove('dont_show');
        document.getElementById('phoneError').textContent = '*Please enter a valid 10-digit phone number*';
        isValid = false;
    }

    if (vehicle_number === '') {
        document.getElementById('vehicleNumberError').textContent = '*Vehicle number is required*';
        isValid = false;
    }

    if (time === '') {
        document.getElementById('timeError').textContent = '*Time is required*';
        isValid = false;
    }

    if (isValid) {
        send_from_data(name, phone, date, person, vehicle_number, time);
    }
});

function send_from_data(name, phone, date, person, vehicle_number, time) {
    console.log(phone);

    let templateParams = {
        user_name: name,
        user_phone: phone,
        reservation_date: date,
        number_of_persons: person,
        vehicle_number: vehicle_number,
        reservation_time: time
    };

    emailjs.send('service_mfb2kdn', 'template_f4a31v8', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully via EmailJS!');

            // Clear form fields after successful submission
            document.getElementById('appitment_name').value = '';
            document.getElementById('appitment_phone').value = '';
            document.getElementById('reservation-date').value = '';
            document.getElementById('vahicule_number').value = '';
            document.getElementById('time').value = '';
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong with EmailJS.');
        });
}