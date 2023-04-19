class NotebooksController < ApplicationController
  def index
  end

  def create
    @notebook = Notebook.new(
      name: params[:name],
      user: current_user,
      parent_id: params[:parent_id]
    )

    authorize! :create, @notebook
    @notebook.save!

    render json: {
        id: @notebook.id,
        name: @notebook.name,
        notes: [],
        subnotebooks: {},
    }
  end

  def update
    @notebook = Notebook.find(params[:id])
    authorize! :update, @notebook

    @notebook.update!(name: params[:name])

    render json: {
        id: @notebook.id,
        name: @notebook.name,
        parent_id: @notebook.parent_id,
    }
  end
end
