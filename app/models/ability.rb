class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?

    can :update, Note, user: user
    can :create, Notebook, user: user

    Note.tap do |klass|
      can :create, klass do |request|
        request.user == user
      end
    end
  end
end