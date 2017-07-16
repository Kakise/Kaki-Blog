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

const preview = createClient({
  space: API_SPACE_ID,
  accessToken: API_PREVIEW_TOKEN,
  host: 'preview.contentful.com'
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
// Sounds good, doesn't work 😢
export function fetchPage(id) {
  return client.getEntries({
  	  content_type: 'page',
  	  'fields.slug': id,
      limit: 1
  }).then(entry => {
	return {
	    type: FETCH_PAGE,
      payload: entry.items[0]
    };
  });
}

//// TODO: Add this to the router (should work)
// Fetch a post OR a page and pass it
export function fetchPostPreview(id) {
  return preview.getEntry(id).then(entry => {
      return {
        type: FETCH_POST,
        payload: entry
      };
  });
}

// Fetch one asset (by id) and pass it
export function fetchAsset(id) {
  return client.getAsset(id).then(entry => {
    return {
      type: FETCH_ASSET,
      payload: entry
    };
  });
}
