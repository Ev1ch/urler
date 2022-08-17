export const contentSelector = '.content';
export const contentElement = document.querySelector(contentSelector);

export const formSelector = '.form';
export const inputSelector = '.input';
export const buttonSelector = '.button';
export const formElement = contentElement.querySelector(formSelector);
export const inputElement = formElement.querySelector(inputSelector);
export const buttonElement = formElement.querySelector(buttonSelector);

export const urlsSelector = '.urls';
export const urlsElement = contentElement.querySelector(urlsSelector);
