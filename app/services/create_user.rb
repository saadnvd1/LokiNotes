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
      title: "Untitled",
      content: "<p>👋 </p><p><br></p><p>This is your very first note. Edit it as much as you want, or start creating other notes and notebooks.</p><p><br></p><h2>What are some things you can take notes about?</h2><p><br></p><ul><li>New subjects you're learning about at school or work</li><li>Helping you remember something</li><li>Journaling about your day</li><li>A gratitude list consisting of things that you're really happy about</li><li>Starting on a new short story or novel</li><li>...and much more!</li></ul><p><br></p>"
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
