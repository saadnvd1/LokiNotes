class ImagesController < ApplicationController
  def create
    # TODO: add a guard here to make sure only users who have the proper subscription can only upload images
    note = Note.find(params[:note_id])
    authorize! :update, note

    image = NoteImage.new(image_params)
    image.note = note

    if image.save
      render json: { url: image.file.url }, status: :ok
    else
      render json: { errors: image.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def image_params
    params.permit(:image, :note_id)
  end
end
