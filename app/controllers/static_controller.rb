class StaticController < ApplicationController
  def index
    exec "pip show tensorflow"
  end
end