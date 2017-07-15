import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

import { fetchPage } from '../actions/index';
import Asset from './asset';

class PageShow extends Component {

  componentWillMount() {
    this.props.fetchPage(this.props.params.slug);
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
    const { page } = this.props;

    if (!page) {
        return <h2>Chargement de la page en cours...</h2>
    }
      
    return (
      <article key={page.sys.id} className="uk-article">
        <div className="content">
          <h1>{page.fields.title}</h1>
          <div className="major" dangerouslySetInnerHTML={this.renderMarkdown(page.fields.content)} />
          <br />
          <Link to={"/"}>Retour à l'accueil !</Link>
          <br />
          </div>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPage })(PageShow);