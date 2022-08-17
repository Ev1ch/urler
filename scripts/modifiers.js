export function withPreventDefault(func) {
  return function (event) {
    event.preventDefault();
    func(event);
  };
}
