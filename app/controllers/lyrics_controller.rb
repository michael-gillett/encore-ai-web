class LyricsController < ApplicationController
  def generate
    # Pick a random song by the artist
    song_path = Dir["#{Rails.root}/data/#{params[:artist]}/*"].sample
    # Load the random kanye song
    @lyrics = {lyrics: IO.read(song_path)}
    respond_to do |format|
      format.json { render json: @lyrics.to_json }
      format.html {}
    end
  end
end