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

export function createHost(host) {
  const children = [createElement('span', { class: 'host' }, host.base)];

  if (host.port) {
    children.push(
      ...[
        createDivider(':'),
        createElement('span', { class: 'port' }, host.port),
      ],
    );
  }

  return createElement('div', {}, children);
}

export function createProtocol(protocol) {
  return createElement('div', {}, [
    createElement('span', { class: 'protocol' }, protocol),
    createDivider('://'),
  ]);
}

export function createPathname(pathname, hasParams) {
  const children = [
    createDivider('/'),
    createElement('span', { class: 'pathname' }, pathname),
  ];

  if (hasParams) {
    children.push(createDivider('?'));
  }

  return createElement('div', {}, children);
}

export function createBase(url) {
  const children = [
    createProtocol(url.parsedProtocol),
    createHost(url.parsedHost),
    createPathname(url.parsedPathname, url.hasParams),
  ];

  return createElement('div', { class: 'base' }, children);
}

export function createClose(id) {
  function handleClick() {
    document.querySelector(`[data-id="${id}"]`).remove();
  }

  const close = createElement(
    'button',
    { class: 'close', tabindex: 0 },
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
