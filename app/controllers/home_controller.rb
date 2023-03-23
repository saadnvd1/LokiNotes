class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :check_logged_in]
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
    @notes_data = {}

    @categories.each do |category|
      @notes_data[category.id] = format_category(category)
    end

    render json: { notes_data: @notes_data }
  end

  def format_category(category)
    return if category.nil?

    catH = {
        id: category.id,
        name: category.name,
        notes: category.notes.map { |note| format_note(note) },
        subcategories: {}
    }

    category.children.includes(:notes).each do |subc|
      catH[:subcategories][subc.id] = format_category(subc)
    end

    catH
  end

  def format_note(note)
    {
      id: note.id,
      title: note.title,
      content: note.content,
      category_id: note.category_id,
      created_at: note.created_at,
      updated_at: note.updated_at
    }
  end
end
