import React, { Component } from 'react';
import { connect } from 'react-redux';
import Truncate from 'react-truncate-html';
import marked from 'marked';
import { Link } from 'react-router';
import toRead from 'reading-time';
import ReactPaginate from 'react-paginate';

import { fetchPosts } from '../actions/index';
import Asset from './asset';

class PostsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    }
  }

  componentDidMount() {
      window.scrollTo(0, 0);
      this.props.fetchPosts(1);
  }
    
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.props.fetchPosts(selected + 1);
    this.setState({offset: offset, data: this.props.posts.items});
  };

  renderPosts() {
    const { posts } = this.props;

      if(this.props.posts.length !== 0){
    
    return this.props.posts.items.map((post, index) => {
        if (typeof post.fields.date !== "undefined"){
            post.date = new Intl.DateTimeFormat("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                }).format(new Date(post.fields.date));
        }
        switch (Math.trunc(parseInt(toRead(post.fields.article).time, 10) / 60000)) {
            case 0:
                post.toRead = "moins d'une minute.";
                break;
            case 1:
                post.toRead = "une minute."
                break;
            default:
                post.toRead = Math.trunc(parseInt(toRead(post.fields.article).time, 10) / 60000).toString() + " minutes.";
                break;
        }
      return (
        <article key={post.sys.id} className="uk-article">
          <div className="content">
            <h2 className="uk-article-title" style={{color: "#739a99"}}>{post.fields.title}</h2>
			<p className="uk-article-meta">
			{post.date.charAt(0).toUpperCase() + post.date.slice(1)} 
			<br />
			Temps de lecture estimé: {post.toRead}
			</p>
            <div className="list-blog-padding">
            <Truncate 
				lines={10}
				portrait={12}
				responsive={true}
				breakWord={true}
				dangerouslySetInnerHTML={{__html: marked(post.fields.article)}} 
				/>
            </div>
            <br />
            <Link to={"posts/" + post.sys.id}>Lire la suite</Link>
          </div>
		  <hr />
        </article>
      );
    });
}
  }
  
  paginate() {
      if (this.props.posts.length !== 0) {
          return(
                <ReactPaginate previousLabel={"Précédent"}
                       nextLabel={"Suivant"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={Math.ceil(parseInt(this.props.posts.total, 10) / 5)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"uk-pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"uk-active"} />
              );
      }
  }
  
  render() {        
        document.title = "Accueil | cat /dev/urandom";
        return(
            <div>
                {this.renderPosts()}
                <br />
                <br />
                {this.paginate()}
            </div>
        );
  }
}


function mapStateToProps(state) {
  return { posts: state.posts.all };
}
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
function refreshPage(){ window.parent.location = window.parent.location.href; }
