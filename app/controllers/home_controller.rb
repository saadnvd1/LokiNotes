class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  def index
  end

  # If someone hits this endpoint and they don't have a valid JWT token, then
  # this endpoint will simply return an error, otherwise we just return the
  # `current_user` to set on the frontend. Should be fine for now
  def check_logged_in
    render json: { user: current_user }
  end

  def notes
    # TODO: make sure there's no n+1s here, esp with the ancestry stuff
    @categories = current_user.categories.where(ancestry: nil).includes(:notes)
    @notes_data =  @categories.map { |category| format_category(category) }

    render json: { notes_data: @notes_data }
  end

  def format_category(category)
    return if category.nil?

    {
        id: category.id,
        name: category.name,
        subcategories: category.children.includes(:notes).map { |category| format_category(category) },
        notes: category.notes.map { |note| format_note(note) }
    }
  end

  def format_note(note)
    {
      id: note.id,
      title: note.title,
      content: note.content,
      created_at: note.created_at,
      updated_at: note.updated_at
    }
  end
end
