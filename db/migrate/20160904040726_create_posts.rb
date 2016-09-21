class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :text
      t.string :ancestry

      t.timestamps null: false
    end
    add_index :posts, :ancestry
  end
end
