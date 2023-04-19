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
        meta: @notebook.meta,
        subnotebooks: {},
    }
  end

  def update
    @notebook = Notebook.find(params[:id])
    authorize! :update, @notebook

    @notebook.assign_attributes(update_params.except(:meta))
    @notebook.meta.merge!(update_params[:meta])
    @notebook.save!

    render json: {
        id: @notebook.id,
        name: @notebook.name,
        meta: @notebook.meta,
        parent_id: @notebook.parent_id,
    }
  end

  private

  def update_params
    params.permit(:name, meta: [:show_sub_menu])
  end
end
