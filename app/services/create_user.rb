class CreateUser < ActiveInteraction::Base
  string :email, :password

  def execute
    ActiveRecord::Base.transaction do
      user = User.new(user_params)
      user.save!

      create_trial(user)
      create_standard_notebook(user)

      user
    end
  end

  private

  def create_standard_notebook(user)
    Notebook.create!(
      user: user,
      name: "My Notebook",
      default: true
    )

    Note.create!(
      notebook: user.notebooks.first,
      title: "Welcome to Lokinotes!",
      content: "This is your first note. You can edit it or delete it and create your own."
    )
  end

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
