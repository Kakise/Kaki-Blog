import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAsset } from '../actions/index';
import { Link } from 'react-router';

// Assets viewer
class Asset extends Component {
  componentDidMount() {
    this.props.fetchAsset(this.props.params.assetId)
  }
  renderAsset() {
    return this.props.assets.map((asset) => {
      if (asset.sys.id == this.props.params.assetId) {
        document.title = asset.fields.title + " | cat /dev/urandom";
        return (
		<div key={asset.sys.id}>
			<h2>Fichier: <i>{asset.fields.title}</i></h2>
			<p>Description: {asset.fields.description}</p>
			<img src={asset.fields.file.url} alt={asset.fields.file.fileName} key={`${asset.sys.id}`}/>
			<br />
			<br />
			<Link to={"/"}>Retour à l'accueil !</Link>
        </div>
		);
      }
    });
  }
  render() {
    return (
      <div>
        {this.renderAsset()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assets: state.assets
  };
}

export default connect(mapStateToProps, { fetchAsset })(Asset)
