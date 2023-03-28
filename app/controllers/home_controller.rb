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
    @notebooks = current_user.notebooks.where(ancestry: nil).includes(:notes)
    @notes_data = {}

    @notebooks.each do |notebook|
      @notes_data[notebook.id] = format_notebook(notebook)
    end

    render json: { notes_data: @notes_data }
  end

  def format_notebook(notebook)
    return if notebook.nil?

    catH = {
        id: notebook.id,
        name: notebook.name,
        notes: notebook.notes.map { |note| format_note(note) },
        subnotebooks: {}
    }

    notebook.children.includes(:notes).each do |subnotebook|
      catH[:subnotebooks][subnotebook.id] = format_notebook(subnotebook)
    end

    catH
  end

  def format_note(note)
    {
      id: note.id,
      title: note.title,
      content: note.content,
      notebook_id: note.notebook_id,
      created_at: note.created_at,
      updated_at: note.updated_at
    }
  end
end
