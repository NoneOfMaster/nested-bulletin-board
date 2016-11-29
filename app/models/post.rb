class Post < ActiveRecord::Base

  has_ancestry

  def self.individual_to_json(id)
    posts_hash = Post.where("id = ? OR ancestry LIKE ?",id,"%#{id}%").arrange(:order => :created_at)
    {posts: Post.json_converter(posts_hash)} 
  end

  def self.top_level_posts_json
    posts_hash = Post.where({ancestry: nil}).arrange(:order => :created_at)
    {posts: Post.json_converter(posts_hash)} 
  end

  def self.make_master_json
    posts_hash = Post.all.arrange(:order => :created_at)
    {posts: Post.json_converter(posts_hash)}   
  end

  def self.json_converter(posts_hash)
    posts_hash.map{|parent, children|
      parent.is_deleted == TRUE ? text = "<<deleted>>" : text = parent.text
      key = parent.id
      {key => {
                id: parent.id,
                text: text,
                created_at: parent.created_at,
                updated_at: parent.updated_at,
                children: Post.json_converter(children)
              }
      }
    }
  end

end
