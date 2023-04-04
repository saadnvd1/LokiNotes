class AddActiveToTrials < ActiveRecord::Migration[7.0]
  def change
    # Rather than destroying a trial, I'd like to keep a record of it in case we need to look back at it, so adding this extra column
    add_column :trials, :active, :boolean, default: true
  end
end
