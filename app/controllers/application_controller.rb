class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  ## helper methods are made available to the views
  helper_method :current_user, :user_signed_in?

  def home
    render component: 'HomeShowBody'
  end

  private

    def current_user
      @current_user ||= User.find_by(id: session["user_id"])
    end

end
