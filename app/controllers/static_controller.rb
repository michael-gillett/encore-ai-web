class StaticController < ApplicationController
  def index
    @res = IO.read(Rails.root + "data/kanye_west/text.txt")
  end
end