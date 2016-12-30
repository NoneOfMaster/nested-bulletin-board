var TopSelector = React.createClass({

  render() {
    return (
      <div className="top">
        { this.props.postSet === "discussionTopics" &&
          <h1>All Discussions</h1>
        }
        { this.props.postSet === "master" &&
          <h1>Master List of All Posts</h1>
        }
        { this.props.postSet === "discussionTopics" &&
          <div>
            <NewPostForm
              add={this.props.add}
              postType="newPost"
              placeHolderText="start a new discussion"
              currentUserID={this.props.currentUserID}
            />
          </div>
        }
        { this.props.formFor === "newUser" &&
          <h1>Sign Up!</h1>
        }
        { this.props.formFor === "newSession" &&
          <h1>Sign In!</h1>
        }
      </div>
    )
  }
  
});

TopSelector.propTypes = {
  postSet: React.PropTypes.string,
  formFor: React.PropTypes.string
};