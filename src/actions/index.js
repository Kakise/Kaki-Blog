import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_ASSET = 'FETCH_ASSET';

const API_BASE_URL = "https://cdn.contentful.com";
const API_SPACE_ID = "wow5ow20m6w6";
const API_TOKEN = "8091c755b428817b2db3f73510e71bbf826f89dc368cbbcde94d7e8011e165b7";
const API_PREVIEW_TOKEN = "30926ad837e6b483c8625764edf9bdb873e06a33040d93b8644a76c5c3131039";

export function fetchPosts(id) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=blogPost&order=-fields.date&skip=${5 * (id - 1)}&limit=${5 * id}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries/${id}?access_token=${API_TOKEN}&content_type=blogPost`);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function fetchPostPreview(id) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries/${id}?access_token=${API_TOKEN}&content_type=blogPost`);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function fetchAsset(id) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/assets/${id}?access_token=${API_TOKEN}&fm=jpg&fl=progressive`);
  return {
    type: FETCH_ASSET,
    payload: request
  };
}
