// React consts
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_PAGE = 'FETCH_PAGE';
export const FETCH_ASSET = 'FETCH_ASSET';

// Contentful setup
import {createClient} from 'contentful';
const API_SPACE_ID = "wow5ow20m6w6";
const API_TOKEN = "8091c755b428817b2db3f73510e71bbf826f89dc368cbbcde94d7e8011e165b7";
const API_PREVIEW_TOKEN = "30926ad837e6b483c8625764edf9bdb873e06a33040d93b8644a76c5c3131039";

const client = createClient({
  space: API_SPACE_ID,
  accessToken: API_TOKEN
});

// Fetch the posts list and pass it
export function fetchPosts(id) {
  return client.getEntries({
    order: "-fields.date",
    skip: 5 * (id - 1),
    limit: 5 * id,
    content_type: "blogPost"
  }).then(entry => {
      return {
        type: FETCH_POSTS,
        payload: entry
      };
  });
}

// Fetch one post and pass it
export function fetchPost(id) {
  return client.getEntry(id).then(entry => {
      return {
        type: FETCH_POST,
        payload: entry
      };
  });
}

// Fetch a post (by slug) and pass it
export function fetchPage(id) {
  return client.getEntries({
  	  content_type: 'page',
  	  'fields.slug': id
  }).then(entry => {
	return {
	  type: FETCH_POST,
      payload: entry
    };
  });
}

//// TODO: Update this routine and add it to the router 
//export function fetchPostPreview(id) {
//  //const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries/${id}?access_token=${API_TOKEN}&content_type=blogPost`);
//  return {
//    type: FETCH_POST,
//    payload: request
//  };
//}

// Fetch one asset (by id) and pass it
export function fetchAsset(id) {
  return client.getAsset(id).then(entry => {
    return {
      type: FETCH_ASSET,
      payload: entry
    };
  });
}
