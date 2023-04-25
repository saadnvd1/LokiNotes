class CreateUser < ActiveInteraction::Base
  string :email, :password

  def execute
    user = User.new(user_params)
    user.save!

    create_trial(user)

    user
  end

  private

  def create_trial(user)
    Trial.create!(user: user,
      start_date: Date.current,
      end_date: 14.days.from_now,
      active: true)
  end

  def user_params
    {
      email: email,
      password: password
    }
  end
end
