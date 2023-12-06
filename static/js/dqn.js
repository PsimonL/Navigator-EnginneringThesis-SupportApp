// import { handleFormSubmit } from './form_helper';
document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.querySelector('#dqn-contact button[type="submit"]');

    // handleFormSubmit("problem_description", '/contact_data_save')
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        var sugestionDescriptionInput = document.querySelector('textarea[name="problem_description"]');
        var nameInput = document.querySelector('input[name="name"]');
        var emailInput = document.querySelector('input[name="email"]');
        var phoneNumberInput = document.querySelector('input[name="phone"]');

        if (!sugestionDescriptionInput.value || !nameInput.value || !emailInput.value || !phoneNumberInput.value) {
            alert('Wszystkie pola muszą być wypełnione, aby formularz został zapisany!!!');
            return;
        }

        if (sugestionDescriptionInput && nameInput && emailInput && phoneNumberInput) {
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

            fetch('/dqn_data_save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.text())
            .then(data => {
                alert('Poprawnie zapisano i wysłano formularz do serwera bazo-danowego. :)');
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
