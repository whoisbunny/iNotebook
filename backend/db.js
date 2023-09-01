// const mongoose = require('mongoose')
// const mongoURI = "mongodb://localhost:27017/"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI , ()=>{
//         console.log("Connect");
//     });
// }

// module.exports = connectToMongo;



// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017";

// const connectToMongo = async () => {
    // try {
        //     mongoose.set('strictQuery', false)
        //     mongoose.connect(mongoURI ); 
        //     console.log('Mongo connected')
        // }
        // catch(error) {
            //     console.log(error)
            //     process.exit()
            // }
            // }
            // module.exports = connectToMongo;
            
            
            
            // const connectToMongo = ()=>{
                // mongoose.connect(mongoURI, {
                    //     useNewURLParser: true,
                    //     useUnifiedTopology: true
                    
                    //   },60000)
                    
                    //   .then(console.log("connected to server"))
                    //   .catch((err) => console.log(err));
                    // }
                    // module.exports = connectToMongo;
                    
                    
    const mongoose = require('mongoose');
    const server = 'mongodb://127.0.0.1:27017';
    const dbs = "iNotebook"
    const connectToMongo = async ()=>{
        try {
            await  mongoose.connect(`${server}/${dbs}`)
            console.log('mongodb connection');
        } catch (error) {
            console.log(error);
            
        }
}
module.exports = connectToMongo
