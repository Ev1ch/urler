import {
    clearElement,
    disableElement,
    enableElement,
    focusElement,
} from './dom.js';
import {
    formElement,
    inputElement,
    buttonElement,
    urlsElement,
} from './elements.js';
import { getObjectFromFormData } from './form-data.js';
import { withPreventDefault } from './modifiers.js';
import { createUrl } from './ui.js';
import { Url } from './url.js';
import { getId } from './utils.js';

const history = [];

function handleFormSubmit() {
    try {
        let { url } = getObjectFromFormData(new FormData(formElement));

        if (!Url.isValid(url)) {
            return;
        }

        clearElement(inputElement);
        disableElement(buttonElement);

        url = url.trim();
        const id = getId();

        history.push({ id, url });

        url = new Url(url);

        urlsElement.prepend(createUrl(url, id));
    } catch (error) {
        console.error(error);
    }
}

function handleInputChange(event) {
    const url = event.target.value.trim();

    if (!Url.isValid(url)) {
        disableElement(buttonElement);
        return;
    }

    enableElement(buttonElement);
}

function handleLoad() {
    focusElement(inputElement);
}

formElement.addEventListener('submit', withPreventDefault(handleFormSubmit));
inputElement.addEventListener('keyup', handleInputChange);
inputElement.addEventListener('change', handleInputChange);
window.addEventListener('load', handleLoad);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/worker.js');
}
