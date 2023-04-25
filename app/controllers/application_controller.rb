class ApplicationController < ActionController::Base
  before_action :set_paper_trail_whodunnit

  # This disables the user from being stored in the session since we're using JWT it doesn't matter
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  helper_method :current_user, :current_token

  def current_token
    request.env["warden-jwt_auth.token"] || request.headers["Authorization"].split(" ").last
  end
end
