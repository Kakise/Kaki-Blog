import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';
import PageShow from './components/page_show';
import Asset from './components/asset';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex}/>
    <Route path ="posts/:id" component={PostsShow} />
    <Route path ="page/:slug" component={PageShow} />
	<Route path ="asset/:assetId" component={Asset} />
  </Route>
);
