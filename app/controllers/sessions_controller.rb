class SessionsController < ApplicationController

  def new
    @active_nav = 1
    render component: 'SessionsAndNewUsersForm', props: {formFor: "newSession"}
  end

  def create
    @user = User.find_by(username: session_params[:username])
    respond_to do |format|
      if @user && @user.authenticate(session_params[:password])
        ## TODO: returning the user to the page they came from, or post index if login
        session[:user_id] = @user.id
        format.json { render json: {success: true, user: @user} }
      else
        format.json { render json: {success: false, errors: "username or password not found"} }
      end
    end
  end

  def destroy
    session.destroy
    ## set automatic session expiration
    render component: 'HomeShowBody'
  end

  private

    def session_params
      params.require(:user).permit(:username, :password)
    end

end
