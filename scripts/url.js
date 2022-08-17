export function getObjectFromSearchParams(searchParams) {
  const object = {};

  for (const [key, value] of searchParams.entries()) {
    object[key] = value;
  }

  return object;
}

export function getObjectFromHost(host) {
  const hasPort = host.includes(':');

  return {
    base: host.substring(0, hasPort ? host.indexOf(':') : host.length),
    port: hasPort ? host.substring(host.indexOf(':') + 1) : undefined,
  };
}

export class Url extends URL {
  static isValid(url) {
    try {
      new Url(url);
      return true;
    } catch {
      return false;
    }
  }

  get parsedHost() {
    return getObjectFromHost(this.host);
  }

  get parsedParams() {
    return getObjectFromSearchParams(this.searchParams);
  }

  get parsedProtocol() {
    return this.protocol.substring(0, this.protocol.length - 1);
  }

  get parsedPathname() {
    return this.pathname.substring(1);
  }

  get hasParams() {
    return Object.keys(this.parsedParams).length !== 0;
  }
}
