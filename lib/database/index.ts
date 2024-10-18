import moongose from 'mongoose'

const MONGODB_URL= process.env.MONGODB_URL;

let cached= (global as any).mongoose || {connection: null, promise: null}

export const connectDatabase= async()=>{
    if(cached.connection ) return cached.connection;

    if(!MONGODB_URL) throw new Error("MONGODB URL is Missing!")
    
    cached.promise= cached.promise || moongose.connect(MONGODB_URL, {
        dbName:'inoicain-ticketing',
        bufferCommands:false,

    })

    cached.connection= await cached.promise

    return cached.connection
}