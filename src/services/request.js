import store from '../store/store';
import { getUser } from '../components/auth/reducers';

let token = '';
const key = 'user';
const storage = window.localStorage;

store.subscribe(() => {
  const user = getUser(store.getState());
  const nextToken = user ? (user.token || '') : '';
  if(nextToken === token) return;

  token = nextToken;
  token ? storage.setItem(key, JSON.stringify(user)) : clearStoredUser();
});

export const getStoredUser = () => {
  const json = storage.getItem(key);
  try {
    return JSON.parse(json);
  }
  catch(err) {
    clearStoredUser();
  }
};

export const clearStoredUser = () => storage.removeItem(key);

function request(url, options = {}, data) {
  if(data) options.body = JSON.stringify(data);
  if(token) {
    if(!options.headers) options.headers = {};
    options.headers.Authorization = token;
  }
  return fetch(url, options)
    .then(response => [response.ok, response.json()])
    .then(([ok, json]) => {
      if(ok) return json;
      throw json.message || json.error || json.errors || json;
    });
}

const headers = {
  'content-type': 'application/json'
};

export const get = url => request(url);
export const post = (url, data) => request(url, { method: 'POST', headers }, data);
export const put = (url, data) => request(url, { method: 'PUT', headers }, data);
export const del = (url, data) => request(url, { method: 'DELETE' }, data);

export const getWithCache = url => {
  const json = window.localStorage.getItem(url);
  if(json) {
    const response = JSON.parse(json);
    return Promise.resolve(response);
  }

  return get(url) 
    .then(response => {
      window.localStorage.setItem(url, JSON.stringify(response));
      return response;
    });
};