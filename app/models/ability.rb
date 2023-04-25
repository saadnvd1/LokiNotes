class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?

    Notebook.tap do |klass|
      can :create, Notebook, user: user
      can :update, Notebook, user: user
    end

    Note.tap do |klass|
      can :update, Note, user: user
      can :create, Note, user: user
    end
  end
end
