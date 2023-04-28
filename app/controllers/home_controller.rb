class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :check_logged_in]

  # TODO: rename this to session
  def check_logged_in
    render "home/session_data"
  end

  def notes
    @notebooks = {}
    @notes = {}

    current_user.notes.each do |note|
      @notes[note.id] = format_note(note)
    end

    current_user.notebooks.each do |notebook|
      @notebooks[notebook.id] = format_notebook(notebook)
    end


    render json: {notes: @notes, notebooks: @notebooks, default_notebook_id: current_user.default_notebook.id, default_note_id: current_user.default_notebook.notes.first.id}
  end

  def format_notebook(notebook)
    {
      id: notebook.id,
      name: notebook.name,
      meta: notebook.meta,
      parent_notebook_id: notebook.parent.try(:id),
      subnotebook_ids: notebook.descendants.pluck(:id),
    }
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
