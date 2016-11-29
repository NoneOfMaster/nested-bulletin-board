var TopSelector = React.createClass({


  render() {
    return (
      <div>
        { this.props.postSet === "discussionTopics" &&
          <h1>All Discussions</h1>
        }
        { this.props.postSet === "master" &&
          <h1>Master List of All Posts</h1>
        }
        { ["discussionTopics", "master"].includes(this.props.postSet) &&
          <NewPostForm
            add={this.props.add}
            postType="newPost"
            placeHolderText="start a new discussion"
          />
        }
      </div>
    )
  }
  
});

TopSelector.propTypes = {
  postSet: React.PropTypes.string.isRequired
};