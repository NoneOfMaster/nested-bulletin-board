class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
  end

  def new
    @active_nav = 2
    render component: 'SessionsAndNewUsersForm', props: {formFor: "newUser"}
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        session["user_id"] = @user.id
        format.json { render json: {success: true, user: @user} }
      else
        format.json { render json: {success: false, errors: @user.errors.full_messages} }
      end
    end
  end


  def update
  end

  def destroy
    # @user.destroy
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :admin)
    end
end
