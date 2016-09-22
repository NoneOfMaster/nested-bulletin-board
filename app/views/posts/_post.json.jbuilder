json.set! @post.id do
  json.extract! post, :id, :text, :ancestry, :created_at, :updated_at
  json.children []
  json.url post_url(post, format: :json)
end