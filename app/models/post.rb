class Post < ActiveRecord::Base

  has_ancestry

  ### using array as state - no good because flat html
  ### attr_accessor :depth_level
  # def self.arrayify(post_hash)
  #   post_hash.map{|parent, children|
  #     [parent, Post.arrayify(children)]
  #   }
  # end

  # def self.tree_to_array
  #   post_hash = Post.all.arrange(:order => :created_at)
  #   Post.arrayify(post_hash).flatten
  # end

  ### using hash with hashes as keys as state - no good because 
  ### hash keys getting converted to strings by JS
  # def self.json_converter(posts_hash)
  #   posts_hash.map{|parent, children|
  #     key = {
  #       id: parent.id,
  #       text: parent.text,
  #       created: parent.created_at,
  #       modified: parent.updated_at
  #     }
  #     {key => Post.json_converter(children)}
  #   }
  # end

  # def self.make_json(posts_hash)
  #   {posts: Post.json_converter(posts_hash)}
  # end

  def self.json_converter(posts_hash)
    posts_hash.map{|parent, children|
      key = parent.id
      {key => {
                id: parent.id,
                text: parent.text,
                created: parent.created_at,
                edited: parent.updated_at,
                children: Post.json_converter(children)
              }
      }
    }
  end

  def self.make_json(posts_hash)
    {posts: Post.json_converter(posts_hash)}   
  end

  def self.posts_to_ancestry_tree(sort_specification)
    if sort_specification == "created_at"
      return Post.all.arrange(:order => :created_at)
    end
  end

end
