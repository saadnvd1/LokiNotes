class NotesController < ApplicationController
  def index
  end

  # TODO: secure it lol
  def update
    @note = Note.find(params[:id])
    @note.update(content: params[:content])
    render json: { note: @note }
  end
end
