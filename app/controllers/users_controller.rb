class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
    prepare_user_posts
    respond_to do |format|
      format.html {render component: 'PostsBody', 
                          props: { 
                            postSet: "userPosts",
                            posts: @posts,
                            currentUser: @user
                            } 
                          }
    end
  end

  def new
    @active_nav = 2
    ## will need to add logic to ensure referrer page is within app
    referrer = request.referrer || posts_path
    render component: 'SessionsAndNewUsersForm', props: {formFor: "newUser", referrer: referrer}
  end

  def edit
  end

  def create
    @user = User.new(user_params.except("referrer"))
    respond_to do |format|
      if @user.save
        session["user_id"] = @user.id
        format.json { render json: {success: true, user: @user, referrer: user_params["referrer"]} }
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

    def prepare_user_posts
      @posts = Post.user_posts_json(params[:id])
    end

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :admin, :referrer)
    end
end
