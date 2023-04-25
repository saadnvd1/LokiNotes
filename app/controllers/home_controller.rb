class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :check_logged_in]

  # TODO: rename this to session
  def check_logged_in
    render "home/session_data"
  end

  def notes
    # TODO: make sure there's no n+1s here, esp with the ancestry stuff
    @notebooks = current_user.notebooks.where(ancestry: nil).includes(:notes)
    @notes_data = {}

    @notebooks.each do |notebook|
      @notes_data[notebook.id] = format_notebook(notebook)
    end

    render json: {notes_data: @notes_data}
  end

  def format_notebook(notebook)
    return if notebook.nil?

    catH = {
      id: notebook.id,
      name: notebook.name,
      notes: notebook.notes.map { |note| format_note(note) },
      meta: notebook.meta,
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
      created_at: note.created_at.strftime("%m/%d/%Y"),
      updated_at: note.updated_at
    }
  end
end
