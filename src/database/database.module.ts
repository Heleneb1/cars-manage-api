import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';


dotenv.config();

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/`

const client = new MongoClient(uri);
@Global()
@Module({
    imports: [MongooseModule.forRoot(uri)],

    providers: [],
    exports: [MongooseModule],
})
export class DatabaseModule {
    constructor() {
        client.connect().then(() => {
            console.log('Connected to MongoDB 😉');
        }).catch((err) => {
            console.log(err);
        });
    }
}
