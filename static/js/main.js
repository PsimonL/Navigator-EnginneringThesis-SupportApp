document.addEventListener('DOMContentLoaded', function () {
    var loadButton = document.querySelector('.big-button');
    var submitButton = document.querySelector('#contact-form button[type="submit"]');

    loadButton.addEventListener('click', function () {
        window.location.href = '/panel';
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        var problemDescription = document.querySelector('textarea[name="problem_description"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var phoneNumber = document.querySelector('input[name="phone"]').value;

        var formData = {
            problem_description: problemDescription,
            name: name,
            email: email,
            phone: phoneNumber
        };

        fetch('/save_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
