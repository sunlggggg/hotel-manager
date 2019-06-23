import fetch from 'node-fetch';

export async function loginRequest(params) {
    const res = await fetch('/api/common/login', { method: 'POST', body: JSON.stringify(params) });
    return  res.json();
}

export async function roomListRequst(params) {
    const res = await fetch('/api/room/list?pageNo='+(params.pageNo )+'&pageSize='+params.pageSize+'&roomStatus='+params.roomStatus);
    return res.json();
}

export async function checkInRequest(params) {
    const res = await fetch("/api/room/checkin", {method:'POST', body: JSON.stringify(params)});
    return res.json();
}

export async function  checkOutRequst (params) {
    const res = await fetch("/api/room/checkout", {method:'POST', body: JSON.stringify(params)});
    return res.json();
}
