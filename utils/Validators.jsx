export function validate({ name, email, password, selectedRole }) {
  const errors = {};
  switch (true) {
    case !name:
      errors.nameError = "El nombre es requerido";
      break;
    case name.length < 6:
      errors.nameError = "El nombre debe tener al menos 6 caracteres";
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
