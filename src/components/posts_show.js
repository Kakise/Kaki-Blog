import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

import { fetchPost } from '../actions/index';

class PostsShow extends Component {

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  renderMarkdown(content) {
    return {
        __html: marked(content)
    }
  }
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  render() {
    const { post } = this.props;

    if (!post) {
        return <h2>Chargement de l'article en cours...</h2>
    }
    if (post) {document.title = post.fields.title + " | cat /dev/urandom";
hljs.initHighlighting();
hljs.initHighlightingOnLoad();
    	    	var disqus_config = () => {
				this.page.url = window.location.href;
				this.page.identifier = '${post.sys.id}';
			};
	        (function() {
	            var d = document, s = d.createElement('script');
	            s.src = 'https://kakise.disqus.com/embed.js';
	            s.setAttribute('data-timestamp', +new Date());
	            (d.head || d.body).appendChild(s);
	        })();
              }
    return (
      <article key={post.sys.id} className="uk-article">
        <div className="content">
          <h1>{post.fields.title}</h1>
          <div className="major" dangerouslySetInnerHTML={this.renderMarkdown(post.fields.article)} />
          <br />
          <Link to={"/"}>Retour à l'accueil !</Link>
          <br />
          <div id="disqus_thread"></div>
          </div>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
