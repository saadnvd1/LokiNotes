class NotebooksController < ApplicationController
  def index
  end

  def create
    notebook = Notebook.create!(
      name: params[:name],
      user: current_user,
      parent_id: params[:parent_id]
    )

    render json: {
        id: notebook.id,
        name: notebook.name,
        notes: [],
        subnotebooks: {},
    }
  end
end
