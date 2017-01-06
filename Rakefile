# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

desc "Tasks called by the Heroku scheduler add-on"
task :reset_comments => :environment do
  puts "Clearing out nonseed comments..."
  Post.where("created_at > ?", Date.parse("2017-1-1")).destroy_all
  puts "done."
end