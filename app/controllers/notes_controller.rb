class NotesController < ApplicationController
  def index
  end

  def create
    @note = Note.new(notebook_id: params[:notebook_id])

    authorize! :create, @note

    @note.save!
    render json: { note: @note }
  end

  def update
    @note = Note.find(params[:id])
    authorize! :update, @note

    @note.update(content: params[:content])
    render json: { note: @note }
  end
end
