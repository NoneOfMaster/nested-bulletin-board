json.extract! post, :id, :text, :ancestry, :created_at, :updated_at
json.url post_url(post, format: :json)