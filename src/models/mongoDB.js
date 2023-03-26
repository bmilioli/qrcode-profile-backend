const MongoClient = require('mongodb').MongoClient
const uri = process.env.MONGODB_URI

class singletonInstance {
    constructor() {
        this.uri = process.env.MONGODB_URI
        this.options = {
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            maxIdleTimeMS: 60000,
        }
        this.mongoClient = null
        this.session = null
    }

    async createConnection() {
        try {
            if (this.mongoClient === null) {
                this.mongoClient = new MongoClient(this.uri, this.options)
                await this.mongoClient.connect()
                console.log('Connected to MongoDB database')
            }
        } catch (error) {
            console.log(`Error connecting to database: ${error}`)
        }
    }

    async startSession() {
        if (!this.session) {
            this.session = await this.mongoClient.startSession()
        }
    }

    async endSession() {
        if (this.session) {
            this.session.endSession()
        }
    }

    async saveOne(dbName, collectionName, data) {
        await this.mongoClient.db(dbName).collection(collectionName).insertOne(data)
    }

    async addOne(dbName, collectionName, data) {
        await this.mongoClient.db(dbName).collection(collectionName).updateOne({}, data)
    }

    async commitTransaction() {
        if (this.session && this.session.inTransaction()) {
            await this.session.commitTransaction()
            this.session.endSession()
        }
    }

    async abortTransaction() {
        if (this.session && this.session.inTransaction()) {
            await this.session.abortTransaction()
            this.session.endSession()
        }
    }

    async connect() {
        try {
            if (this.mongoClient === null) {
                this.mongoClient = new this.MongoClient(this.uri, this.options)
            }
            await this.mongoClient.connect()
            console.log('Connected to MongoDB database')
        } catch (error) {
            console.log(`Error connecting to database: ${error}`)
        }
    }

    closeConnection() {
        this.mongoClient.close()
        console.log('Connection closed')
    }

    async readMany(dbName, collectionName) {
        let result = await this.mongoClient.db(dbName).collection(collectionName).find().toArray()
        return result
    }

    async readOne(dbName, collectionName) {
        let result = await this.mongoClient.db(dbName).collection(collectionName).findOne()
        return result
    }

    async updateClient(dbName, collectionName, number, data) {
        let filter = { id: number }
        await this.mongoClient.db(dbName).collection(collectionName).updateOne(filter, { $set: data })
    }

    async update(dbName, collectionName, filter, data) {
        await this.mongoClient.db(dbName).collection(collectionName).updateOne(filter, { $set: data })
    }

    async deleteClient(dbName, collectionName, number) {
        let filter = { id: number }
        await this.mongoClient.db(dbName).collection(collectionName).deleteMany(filter)
    }

    handleSIGINT() {
        process.on('SIGINT', async () => {
            console.log('Closing MongoDB connections')
            await this.mongoClient.close()
            console.log('MongoDB connections closed')
            process.exit(0)
        })
    }
}

const mongoClient = new singletonInstance()

module.exports = mongoClient