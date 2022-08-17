export function getId() {
  const randomId = String(Math.random() * 1000);

  return randomId.substring(0, randomId.indexOf('.'));
}
