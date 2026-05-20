/**
 * SportPulse News - Feedback Form Validation
 * Client-side validation with HTML5 and custom JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const fields = {
    fullName: {
      element: document.getElementById('fullName'),
      error: document.getElementById('fullNameError'),
      validate: function (value) {
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return 'Name can only contain letters.';
        return '';
      }
    },
    email: {
      element: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: function (value) {
        if (!value.trim()) return 'Email address is required.';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      }
    },
    phone: {
      element: document.getElementById('phone'),
      error: document.getElementById('phoneError'),
      validate: function (value) {
        if (!value.trim()) return 'Phone number is required.';
        const phonePattern = /^[\d\s\-+()]{7,20}$/;
        if (!phonePattern.test(value.trim())) return 'Please enter a valid phone number.';
        return '';
      }
    },
    sportInterest: {
      element: document.getElementById('sportInterest'),
      error: document.getElementById('sportInterestError'),
      validate: function (value) {
        if (!value || value === '') return 'Please select a sport category.';
        return '';
      }
    },
    rating: {
      element: document.getElementById('rating'),
      error: document.getElementById('ratingError'),
      validate: function (value) {
        if (!value || value === '') return 'Please rate your experience.';
        return '';
      }
    },
    message: {
      element: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: function (value) {
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        if (value.trim().length > 500) return 'Message cannot exceed 500 characters.';
        return '';
      }
    },
    terms: {
      element: document.getElementById('terms'),
      error: document.getElementById('termsError'),
      validate: function (checked) {
        if (!checked) return 'You must agree to the terms and conditions.';
        return '';
      }
    }
  };

  function showError(field, message) {
    field.element.classList.add('is-invalid');
    field.error.textContent = message;
    field.error.classList.add('visible');
  }

  function clearError(field) {
    field.element.classList.remove('is-invalid');
    field.error.textContent = '';
    field.error.classList.remove('visible');
  }

  function validateField(name) {
    const field = fields[name];
    let value;
    if (name === 'terms') {
      value = field.element.checked;
    } else {
      value = field.element.value;
    }
    const error = field.validate(value);
    if (error) {
      showError(field, error);
      return false;
    }
    clearError(field);
    return true;
  }

  function validateAll() {
    let isValid = true;
    for (const name in fields) {
      if (!validateField(name)) isValid = false;
    }
    return isValid;
  }

  // Real-time validation on blur
  for (const name in fields) {
    const field = fields[name];
    const event = name === 'terms' ? 'change' : 'blur';
    field.element.addEventListener(event, function () {
      validateField(name);
    });

    if (name !== 'terms') {
      field.element.addEventListener('input', function () {
        if (field.element.classList.contains('is-invalid')) {
          validateField(name);
        }
      });
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const successMsg = document.getElementById('successMessage');

    if (validateAll()) {
      successMsg.classList.add('visible');
      form.reset();
      for (const name in fields) {
        clearError(fields[name]);
      }
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () {
        successMsg.classList.remove('visible');
      }, 5000);
    } else {
      successMsg.classList.remove('visible');
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  form.addEventListener('reset', function () {
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.remove('visible');
    for (const name in fields) {
      clearError(fields[name]);
    }
  });
});
