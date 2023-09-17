document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.querySelector('.range');
  const form = document.querySelector('form');
  const formInputs = form.querySelectorAll('input, select, textarea');
  const totalInputs = formInputs.length;

  form.addEventListener('input', () => {
    let filledInputs = 0;

    formInputs.forEach(input => {
      if (input.value && input.value !== 'Department One') {
        filledInputs++;
      }
    });

    const progress = (filledInputs / totalInputs) * 100;

    // Update the range input value
    rangeInput.value = progress;
  });
});
