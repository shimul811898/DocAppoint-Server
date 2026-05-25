const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

dontenv.config();
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("docappoint");
    const appointmentCollection = db.collection("bookappointments");

    app.get("/allAppoint", async (req, res) =>{
      const result = await appointmentCollection.find().toArray()
      res.json(res)
    })

    app.post("/bookappointment", async (req, res) => {
    
        const bookappointmentData = req.body;
        const result = await appointmentCollection.insertOne(bookappointmentData);
        
        res.json(result);
    
        });
       await client.db("admin").command({ping: 1});
       console.log(
          "Pinged your deployment.You successfully connect to MongoDB"
       );
      } finally{
        // await client.close();
      }
    }
    run().catch(console.dir);

    app.get("/",(req, res) => {
      res.send("Server is runnging fine!");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
   