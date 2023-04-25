class NotesController < ApplicationController
  def index
  end

  def create
    @note = Note.new(notebook_id: params[:notebook_id])

    authorize! :create, @note

    @note.save!
    render json: {note: @note, parent_notebook_id: @note.notebook.ancestry}
  end

  def update
    @note = Note.find(update_params[:id])
    authorize! :update, @note

    @note.update(update_params)
    render json: {note: @note}
  end

  private

  def update_params
    params.permit(:id, :content, :title)
  end
end
