import { validate } from 'validate.js';

export function validatePasswords(password1, password2) {
  const passwordsConstraints = {
    password1: {
      presence: {
        allowEmpty: false,
        message: '^Password is required.',
      },
      length: {
        minimum: 8,
        message: '^Password must be at least 8 characters long.',
      },
    },
    password2: {
      presence: {
        allowEmpty: false,
        message: '^Password confirmation is required.',
      },
      equality: {
        attribute: 'password1',
        message: '^Passwords do not match.',
      },
    },
  };

  const passwordsMsgs = validate(
    { password1, password2 },
    passwordsConstraints
  );

  if (passwordsMsgs) {
    showErrorMessages(passwordsMsgs);

    if (!passwordsMsgs.password1) {
      hideErrorMessages(['password1']);
    }
    if (!passwordsMsgs.password2) {
      hideErrorMessages(['password2']);
    }
    return false;
  }

  hideErrorMessages(['password1', 'password2']);
  return true;
}

export function validateRegisteration(name, email) {
  const basicConstraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: 'is required.',
      },
      length: {
        minimum: 5,
        message: 'must be at least 5 characters long.',
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: 'is required.',
      },
      email: {
        message: '^Please enter a valid email.',
      },
    },
  };

  const msgs = validate({ name, email }, basicConstraints);

  if (msgs) {
    showErrorMessages(msgs);

    if (!msgs.name) {
      hideErrorMessages(['name']);
    }
    if (!msgs.email) {
      hideErrorMessages(['email']);
    }
    return false;
  }

  hideErrorMessages(['name', 'email']);
  return true;
}

export function validateLogin(email, password) {
  const basicConstraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: 'is required.',
      },
      email: {
        message: '^Please enter a valid email.',
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: 'is required.',
      },
    },
  };

  const msgs = validate({ email, password }, basicConstraints);

  if (msgs) {
    showErrorMessages(msgs);

    if (!msgs.email) {
      hideErrorMessages(['email']);
    }
    if (!msgs.password) {
      hideErrorMessages(['password']);
    }
    return false;
  }

  hideErrorMessages(['email', 'password']);
  return true;
}

/*---------- Helper methods ----------*/
function showErrorMessages(msgs) {
  const entries = Object.entries(msgs);
  if (entries) {
    entries.forEach(entry => {
      document.querySelector(`[name=${entry[0]}]`).classList.remove('is-valid');
      document.querySelector(`[name=${entry[0]}]`).classList.add('is-invalid');
      document.querySelector(`.${entry[0]}`).innerHTML = entry[1][0];
    });
  }
}

function hideErrorMessages(elements = []) {
  elements.forEach(el => {
    document.querySelector(`[name=${el}]`).classList.remove('is-invalid');
    document.querySelector(`[name=${el}]`).classList.add('is-valid');
    document.querySelector(`.${el}`).innerHTML = '';
  });
}
