export function isPrimitive(child) {
  return typeof child === 'string' || typeof child === 'number';
}

export function isElement(child) {
  return child instanceof Node || child instanceof HTMLElement;
}

export function disableElement(element) {
  if (typeof element === 'string') {
    document.querySelector(element).disabled = true;
    return;
  }

  element.disabled = true;
}

export function clearElement(element) {
  if (typeof element === 'string') {
    document.querySelector(element).value = '';
    return;
  }

  element.value = '';
}

export function enableElement(element) {
  if (typeof element === 'string') {
    document.querySelector(element).disabled = false;
    return;
  }

  element.disabled = false;
}

export function addAttributes(element, attributes) {
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
}

export function addChild(element, child) {
  if (isPrimitive(child)) {
    element.innerText = child;
    return;
  }

  if (isElement(child)) {
    element.appendChild(child);
  }
}

export function addChildren(element, children) {
  if (Array.isArray(children)) {
    children.forEach((child) => {
      addChild(element, child);
    });
    return;
  }

  addChild(element, children);
}

export function createElement(tag = 'div', attributes = {}, children = null) {
  const element = document.createElement(tag);

  addAttributes(element, attributes);
  addChildren(element, children);

  return element;
}

export function deleteElement(element) {
  if (typeof element === 'string') {
    document.querySelector(element).remove();
    return;
  }

  element.remove();
}

export function existsElement(element) {
  return document.querySelector(element) !== null;
}
