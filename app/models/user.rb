class User < ActiveRecord::Base

  has_many :posts

  validates_uniqueness_of :username
  validates_presence_of :username

  has_secure_password

end
