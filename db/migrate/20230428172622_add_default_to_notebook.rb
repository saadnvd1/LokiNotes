class AddDefaultToNotebook < ActiveRecord::Migration[7.0]
  def change
    add_column :notebooks, :default, :boolean, default: false, null: false

    reversible do |dir|
      dir.up do
        execute <<-SQL
          CREATE UNIQUE INDEX index_notebooks_on_user_id_and_default_true
          ON notebooks (user_id)
          WHERE "default" = true;
        SQL
      end

      dir.down do
        execute <<-SQL
          DROP INDEX IF EXISTS index_notebooks_on_user_id_and_default_true;
        SQL
      end
    end
  end
end
