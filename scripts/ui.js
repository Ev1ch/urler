import { createElement } from './dom.js';

export function createDivider(divider) {
  return createElement('span', { class: 'divider' }, divider);
}

export function createParam(param) {
  return createElement('div', { class: 'param' }, [
    createElement('span', { class: 'key' }, param.key),
    createDivider('='),
    createElement('span', { class: 'value' }, param.value),
  ]);
}

export function createParams(params) {
  return createElement(
    'div',
    { class: 'params' },
    Object.keys(params).map((key) => createParam({ key, value: params[key] })),
  );
}

export function createBase(url) {
  const children = [
    createElement('span', { class: 'protocol' }, url.parsedProtocol),
    createDivider('://'),
    createElement('span', { class: 'host' }, url.parsedHost.base),
  ];

  if (url.parsedHost.port) {
    children.push(
      ...[
        createDivider(':'),
        createElement('span', { class: 'port' }, url.parsedHost.port),
      ],
    );
  }

  children.push(
    ...[
      createDivider('/'),
      createElement('span', { class: 'pathname' }, url.parsedPathname),
    ],
  );

  if (url.hasParams) {
    children.push(createDivider('?'));
  }

  return createElement('div', { class: 'base' }, children);
}

export function createClose(id) {
  function handleClick() {
    document.querySelector(`[data-id="${id}"]`).remove();
  }

  const close = createElement(
    'button',
    { class: 'close' },
    createElement('div', { class: 'cross' }),
  );

  close.addEventListener('click', handleClick);

  return close;
}

export function createUrl(url, id) {
  const children = [createClose(id), createBase(url)];

  if (url.hasParams) {
    children.push(createParams(url.parsedParams));
  }

  return createElement('div', { class: 'url', 'data-id': id }, children);
}
