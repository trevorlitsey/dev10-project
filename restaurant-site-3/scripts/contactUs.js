const form = document.querySelector('form');

function handleSubmit(e) {
  e.preventDefault();

  const [name, email, _, reason] = e.target;

  const alertMessage = document.createElement('div');

  const isValid = name.value && email.value && reason.value;

  if (isValid) {
    alertMessage.classList.add('alert', 'alert-success');
    alertMessage.innerText =
      'Thank your for contacting us! We will be in touch soon.';
  } else {
    alertMessage.classList.add('alert', 'alert-danger');
    alertMessage.innerText =
      'Please input name, email, and reason for inquiry!';
  }

  form.insertBefore(alertMessage, form.childNodes[0]);

  if (isValid) {
    form.reset();
  }
}

form.addEventListener('submit', handleSubmit);
