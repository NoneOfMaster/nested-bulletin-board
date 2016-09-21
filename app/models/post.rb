class Post < ActiveRecord::Base

  has_ancestry

  # adding to as_json would be faster?
  attr_accessor :depth_level

  ### maybe move to preperation helper methods ###
  def self.arrayify(post_hash)
    post_hash.map{|parent, children|
      [parent, Post.arrayify(children)]
    }
  end

  def self.tree_to_array
    post_hash = Post.all.arrange(:order => :created_at)
    Post.arrayify(post_hash).flatten
  end
  ### ###

end
