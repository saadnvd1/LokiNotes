# We should be doing this on the frontend, but it's not a big deal right now. This is much easier, and it only runs every 12 hours. We'll just be removing any and all images that are orphaned, or have been removed from their note, so we can end up saving space
# Someone can remove their image by just simply removing it from the content
class NoteImageDeleter
  include Sidekiq::Job

  def perform
    NoteImage.all.each do |note_image|
      note = note_image.note

      if note.content.exclude?(note_image.file.url)
        note_image.destroy
      end
    end
  end
end
