import fetch from 'node-fetch';

async function login(data, _method) {
    const res = await fetch('/common/login', { method: _method, body: JSON.stringify(data) });
    const result = await res.json();
    return result;
}

export default login;



