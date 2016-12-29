class SessionsController < ApplicationController

  def new
    @active_nav = 1
    ## will need to add logic to ensure referrer page is within app
    referrer = request.referrer || posts_path
    render component: 'SessionsAndNewUsersForm', props: {formFor: "newSession", referrer: referrer}
  end

  def create
    @user = User.find_by(username: session_params[:username])
    respond_to do |format|
      if @user && @user.authenticate(session_params[:password])
        session[:user_id] = @user.id
        format.json { render json: {success: true, user: @user, referrer: session_params[:referrer]} }
      else
        format.json { render json: {success: false, errors: "username or password not found"} }
      end
    end
  end

  def destroy ## todo: back navs will break it after this at this point
    session.destroy
    ## set up automatic session expiration
    redirect_to request.referrer || posts_path
  end

  private

    def session_params
      params.require(:user).permit(:username, :password, :referrer)
    end

end
