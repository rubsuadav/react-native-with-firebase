export function validate({ name, lastName, email, password, selectedRole }) {
  const errors = {};
  switch (true) {
    case !name:
      errors.nameError = "El nombre es requerido";
      break;
    case name.length < 6:
      errors.nameError = "El nombre debe tener al menos 6 caracteres";
      break;
    case !lastName:
      errors.lastNameError = "El apellido es requerido";
      break;
    case lastName.length < 6:
      errors.lastNameError = "El apellido debe tener al menos 6 caracteres";
      break;
    case !email:
      errors.emailError = "El correo electrónico es requerido";
      break;
    case !/^\w+([\.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(email):
      errors.emailError = "El correo electrónico es inválido";
      break;
    case !password:
      errors.passwordError = "La contraseña es requerida";
      break;
    case !selectedRole:
      errors.roleError = "El rol es requerido";
      break;
    default:
      break;
  }
  return errors;
}

export function validatePhone(phone, setError) {
  let isValid = true;
  let errorMessage = '';

  switch (true) {
    case !phone:
      errorMessage = 'El teléfono es obligatorio';
      isValid = false;
      break;
    case !/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/.test(phone):
      errorMessage = 'El teléfono no es válido';
      isValid = false;
      break;
    default:
      errorMessage = '';
      isValid = true;
      break;
  }
  setError(errorMessage);
  return isValid;
}

export function formatPhoneNumber(phoneNumber) {
  // Eliminar todos los caracteres que no sean dígitos
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Si el número comienza con "34", eliminarlo
  const match = cleaned.match(/^34/);
  if (match) {
    cleaned = cleaned.slice(2);
  }

  // Agregar el prefijo de España "+34"
  return `+34${cleaned}`;
}