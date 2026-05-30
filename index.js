const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');

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

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)

const verifyToken = async(req, res, next) => {
  const authHeader = req?.headers.authorization;
  if(!authHeader){
    return res.status(401).json({message:
      "Unauthorized"})
  }
  const token = authHeader.split(" ")[1];
  if(!token){
     return res.status(401).json({message:
      "Unauthorized"})
  }
   try {
       const {payload} = await jwtVerify(token, JWKS)
        console.log(payload)
         next()
   } catch (error) {
      return res.status(401).json({message:
      "Forbidden"})
   }

}

async function run() {
  try {
    // await client.connect();
    const db = client.db("docappoint");
    const appointmentCollection = db.collection("bookappointments");
    const doctorsCollection = db.collection("doctors");

    app.get("/doctors", async (req, res) => {
      const result = await doctorsCollection.find().toArray();
      res.json(result);
    });

    app.get("/doctors/:id", async (req, res) => {
      const { id } = req.params;
      const result = await doctorsCollection.findOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    app.get("/bookappointment", async (req, res) => {
      const result = await appointmentCollection.find().toArray();
      res.json(result);
    })

    app.get("/patient-appointment", async (req, res) => {
      const result = await appointmentCollection.find().toArray();
      res.json(result);
    })

    app.post("/bookappointment", async (req, res) => {
      const bookappointmentData = req.body;
      const result = await appointmentCollection.insertOne(bookappointmentData);
      res.json(result);
    });

    app.post("/patient-appointment", async (req, res) => {
      const bookappointmentData = req.body;
      const result = await appointmentCollection.insertOne(bookappointmentData);
      res.json(result);
    });

    app.patch("/appointments/:id", async (req, res) => {
      const result = await appointmentCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    });

    app.delete("/appointments/:id", async (req, res) => {
      const result = await appointmentCollection.deleteOne(
        { _id: new ObjectId(req.params.id) }
      );
      res.json(result);
    });

    app.get("/bookappointment/:id",verifyToken, async (req, res) => {
      const { id } = req.params
      let result = await appointmentCollection.findOne({ _id: new ObjectId(id) })
      if (!result) {
        result = await doctorsCollection.findOne({ _id: new ObjectId(id) })
      }
      res.json(result);
    })

    app.get("/patient-appointment/:id", async (req, res) => {
      const { id } = req.params
      let result = await appointmentCollection.findOne({ _id: new ObjectId(id) })
      if (!result) {
        result = await doctorsCollection.findOne({ _id: new ObjectId(id) })
      }
      res.json(result);
    })


    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment.You successfully connect to MongoDB"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is runnging fine!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

