document.addEventListener('DOMContentLoaded', function () {
    var loadButton = document.querySelector('.big-button');
    var submitButton = document.querySelector('#contact-form button[type="submit"]');

    loadButton.addEventListener('click', function () {
        window.location.href = '/panel';
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        var sugestionDescriptionInput = document.querySelector('textarea[name="problem_description"]');
        var nameInput = document.querySelector('input[name="name"]');
        var emailInput = document.querySelector('input[name="email"]');
        var phoneNumberInput = document.querySelector('input[name="phone"]');

        if (sugestionDescriptionInput && nameInput && emailInput && phoneNumberInput) {
            console.log("Działa?")
            var problemDescription = sugestionDescriptionInput.value;
            var name = nameInput.value;
            var email = emailInput.value;
            var phoneNumber = phoneNumberInput.value;

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
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);
                sugestionDescriptionInput.value = '';
                nameInput.value = '';
                emailInput.value = '';
                phoneNumberInput.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
});
