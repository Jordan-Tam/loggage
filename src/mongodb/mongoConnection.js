import {MongoClient} from 'mongodb';
import {mongoConfig} from "@/mongodb/settings";

let _connection = undefined;
let _database = undefined;

const databaseConnection = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect(mongoConfig.serverUrl);
        _database = _connection.db(mongoConfig.database);
    }

    return _database;
};

const closeConnection = async () => {
    await _connection.close();
};

export {databaseConnection, closeConnection};