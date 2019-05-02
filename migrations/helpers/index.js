module.exports = `
  CREATE OR REPLACE FUNCTION update_updatedat()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW."updatedat" = now();
    RETURN NEW;
  END;
  $$ language 'plpgsql';
  CREATE TRIGGER update_updatedat
  BEFORE UPDATE ON :table_name:
  FOR EACH ROW EXECUTE PROCEDURE update_updatedat();
`
