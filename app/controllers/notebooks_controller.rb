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
    @notebook = Notebook.find(update_params[:id])
    authorize! :update, @notebook

    @notebook.assign_attributes(update_params.except(:meta))

    if update_params[:meta].present?
      @notebook.meta.merge!(update_params[:meta])
    end

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
    params.permit(:id, :name, meta: [:show_sub_menu])
  end
end
