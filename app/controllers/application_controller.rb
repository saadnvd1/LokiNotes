class ApplicationController < ActionController::Base
  # This disables the user from being stored in the session since we're using JWT it doesn't matter
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def current_token
    request.env['warden-jwt_auth.token']
  end
end

