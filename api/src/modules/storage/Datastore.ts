import SqliteConnector from "./SqliteConnector";

let db: SqliteConnector;

function connect() {
  if (!db) {
    db = new SqliteConnector();
  }

  return db;
}

export default connect();
