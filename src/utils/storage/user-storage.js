export function setUserItem(user, data) {
    window.localStorage.setItem(user, typeof data === 'object' ? JSON.stringify(data) : data);
}

export function getItem(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

export function removeItem(key) {
    window.localStorage.removeItem(key);
}