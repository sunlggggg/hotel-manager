import fetch from 'node-fetch';

export async function loginRequest(data) {
    const res = await fetch('/api/common/login', { method: 'POST', body: JSON.stringify(data) });
    const result = await res.json();
    return result;
}




