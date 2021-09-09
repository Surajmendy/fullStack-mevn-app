const required = (propertyType) => {
  // eslint-disable-next-line no-mixed-operators
  // return (v) => (v && v.length > 0) || `You must provide ${propertyType}`
  return (v) => !!v || `You must provide ${propertyType}`
}

const minLength = (propertyType, minLength) => {
  // eslint-disable-next-line no-mixed-operators
  return (v) =>
    (v && v.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`
}

const maxLength = (propertyType, maxLength) => {
  // eslint-disable-next-line no-mixed-operators
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`
}
const validEmail = () => {
  const regex = /.+@.+\..+/
  // eslint-disable-next-line no-mixed-operators
  return (v) => (v && regex.test(v)) || 'Must be a valid email'
}
const phoneNumberFormat = () => {
  const regex = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,9})$/
  // eslint-disable-next-line no-mixed-operators
  return (v) => (v && regex.test(v)) || 'Must be a valid phone number'
}
export default {
  required,
  minLength,
  maxLength,
  validEmail,
  phoneNumberFormat,
}
