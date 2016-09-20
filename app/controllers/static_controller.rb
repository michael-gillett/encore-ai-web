class StaticController < ApplicationController
  def index
    # Pick a random kanye song
    song_path = Dir[Rails.root + "data/kanye_west/*"].sample
    # Load the random kanye song
    @lyrics = IO.read(song_path)
  end
end