export function getObjectFromFormData(formData) {
  const object = {};

  for (const [key, value] of formData.entries()) {
    object[key] = value;
  }

  return object;
}
