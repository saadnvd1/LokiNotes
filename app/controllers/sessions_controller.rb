class SessionsController < Devise::SessionsController
  clear_respond_to
  respond_to :json
  # POST /v1/login
  def create
    @user = User.find_by_email(user_params[:email].downcase)
    return invalid_login_attempt unless @user

    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      render "home/session_data"
    else
      invalid_login_attempt
    end
  end

  # This isn't even being used, so I'm commenting it out for now
  # def destroy
  #   sign_out(@user)
  #   render :json=> {:success=>true}
  # end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: "invalid login attempt"}, status: :unprocessable_entity
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
