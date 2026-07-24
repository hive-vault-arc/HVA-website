export async function draftMode() {
  return {
    isEnabled: false,
    enable() {},
    disable() {},
  };
}

export async function headers() {
  return new Headers();
}

export async function cookies() {
  return {
    get() {
      return undefined;
    },
    set() {},
    delete() {},
  };
}
