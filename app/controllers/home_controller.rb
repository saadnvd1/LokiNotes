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
    @categories = current_user.categories
    @formatted_categories =  @categories.map(&:format_category)

    render json: { categories: @formatted_categories }
  end

  def format_category(category)
    return if category.nil?

    {
        id: category.id,
        name: category.name,
        subcategories: category.children.map { |category| format_category(category) },
        notes: category.notes.map(&:format_note)
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
