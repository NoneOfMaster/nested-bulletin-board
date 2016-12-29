var HomeShowBody = React.createClass({

  render() {
    return (
      <div id="welcome-message">
        <h2>WELCOME TO MY NESTED COMMENTS EXPLORATION OF REACT WITH RAILS!</h2>
        <h4>NOTES!</h4>
        <p>
          All user-generated content will be purged every three hours and
          replaced with generic seed data to keep things nice and fresh so
          have a blast!
        </p>
        <p>
          Comments will be added immediately  directly below where they are 
          submitted so that you can see that they have been submitted successfully, 
          but they will be ordered (for now) according to date order
          when loaded or refreshed
        </p>
        <h4>COMING SOON!</h4>
        <p>
          <p>Picture Uploads</p>
          <p>Comment Ranking System</p>
        </p>
      </div>
    )
  }

});