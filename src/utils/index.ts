
export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export function validatePassword(value: string) {
  let error;
  if (value.length < 6) {
    error = 'Nice try! more length';
  }
  if (!value) {
    error = 'Required';
  }
  return error;
}

export function validateName(value: string) {
  let error;
  if (value.length < 3) {
    error = 'Nice try! more length';
  }
  if (!value) {
    error = 'Required';
  }
  return error;
}
