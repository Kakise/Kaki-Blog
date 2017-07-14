import React, { Component } from 'react';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index';

// Pagination system (beautiful <3)
class Footer extends Component {
  componentWillMount() {
    var posts = fetchPosts(this.props.params.id);
  }
  render() {
        if (Math.trunc(posts.payload.total / 5) + 1 > this.props.params.id){
        return(
            <div>
                <Link to={"/index/" + (this.props.params.id+1).toString()} onClick={refreshPage}>Page suivante</Link>
            </div>
        );
      }  
  }
}


function refreshPage(){ window.parent.location = window.parent.location.href; }

export default Footer;
