class CreateGifs < ActiveRecord::Migration[6.0]
  def change
    create_table :gifs do |t|
      t.string :url
      t.integer :user_id
      t.timestamps
    end
  end
end
