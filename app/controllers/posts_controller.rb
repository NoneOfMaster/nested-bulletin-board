class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    prepare_posts
    respond_to do |format|
      format.html
      format.json {render :json => @posts_json}
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    @post.save
    respond_to do |format|
      format.html { redirect_to @post, notice: 'Post was successfully created.' }
      format.json { render :show, status: :ok, location: @post }
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find_by(post_params)
    @post.update(:is_deleted => TRUE)
    ## can refactor with rebuild of index jbuilder
    render :json => prepare_posts
  end

  private

    def set_post
      @post = Post.find(params[:id])
    end

    def prepare_posts
      @posts = Post.posts_to_ancestry_tree("created_at")
      @posts_json = Post.make_json(@posts)
    end

    def post_params
      params.require(:post).permit(:id, :text, :parent_id)
    end
    
end
