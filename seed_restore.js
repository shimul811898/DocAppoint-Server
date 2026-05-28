const dontenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

dontenv.config();
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const doctors = [
  {
    "id": 1,
    "doctorName": "Dr. Sarah Johnson",
    "department": "Cardiology",
    "specialization": "Heart Specialist",
    "experience": "12 Years",
    "fee": 1200,
    "rating": 4.9,
    "availableDate": "2026-06-02",
    "availableTime": "10:30 AM",
    "description": "Experienced cardiologist for heart diseases and regular checkups.",
    "imageUrl": "https://www.bma.org.uk/media/7567/img-doctor-woman-reading-file-16x9.jpg?anchor=center&mode=crop&width=1920&height=900",
    "appointmentDate": "2026-06-02"
  },
  {
    "id": 2,
    "doctorName": "Dr. Michael Lee",
    "department": "Neurology",
    "specialization": "Brain & Nerve Specialist",
    "experience": "10 Years",
    "fee": 1500,
    "rating": 4.8,
    "availableDate": "2026-06-05",
    "availableTime": "02:00 PM",
    "description": "Expert in migraine, nerve disorders, and neurological treatments.",
    "imageUrl": "https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    "appointmentDate": "2026-06-05"
  },
  {
    "id": 3,
    "doctorName": "Dr. Emily Watson",
    "department": "Dermatology",
    "specialization": "Skin Specialist",
    "experience": "8 Years",
    "fee": 1000,
    "rating": 4.7,
    "availableDate": "2026-06-07",
    "availableTime": "11:15 AM",
    "description": "Professional skin care and allergy treatment specialist.",
    "imageUrl": "https://static.vecteezy.com/system/resources/previews/026/375/416/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    "appointmentDate": "2026-06-07"
  },
  {
    "id": 4,
    "doctorName": "Dr. David Brown",
    "department": "Orthopedics",
    "specialization": "Bone Specialist",
    "experience": "15 Years",
    "fee": 1800,
    "rating": 5.0,
    "availableDate": "2026-06-10",
    "availableTime": "04:00 PM",
    "description": "Specialist in bone, joint, and muscle-related treatments.",
    "imageUrl": "https://static.vecteezy.com/system/resources/previews/026/376/483/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    "appointmentDate": "2026-06-10"
  },
  {
    "id": 5,
    "doctorName": "Dr. Olivia Martin",
    "department": "Pediatrics",
    "specialization": "Child Specialist",
    "experience": "9 Years",
    "fee": 900,
    "rating": 4.6,
    "availableDate": "2026-06-12",
    "availableTime": "09:00 AM",
    "description": "Dedicated child healthcare and pediatric consultation expert.",
    "imageUrl": "https://static.vecteezy.com/system/resources/previews/026/376/471/non_2x/ai-generative-portrait-of-a-smiling-female-doctor-standing-with-arms-crossed-in-the-office-photo.jpg",
    "appointmentDate": "2026-06-12"
  },
  {
    "id": 6,
    "doctorName": "Dr. James Wilson",
    "department": "ENT",
    "specialization": "Ear Nose Throat Specialist",
    "experience": "11 Years",
    "fee": 1100,
    "rating": 4.8,
    "availableDate": "2026-06-14",
    "availableTime": "01:30 PM",
    "description": "ENT expert for sinus, throat, and hearing issues.",
    "imageUrl": "https://static.vecteezy.com/system/resources/thumbnails/036/338/907/small_2x/ai-generated-young-female-doctor-holding-blank-banner-in-clinical-setting-photo.jpg",
    "appointmentDate": "2026-06-14"
  },
  {
    "id": 7,
    "doctorName": "Dr. Sophia Taylor",
    "department": "Gynecology",
    "specialization": "Women Specialist",
    "experience": "13 Years",
    "fee": 1600,
    "rating": 4.9,
    "availableDate": "2026-06-16",
    "availableTime": "03:45 PM",
    "description": "Women's healthcare and pregnancy specialist.",
    "imageUrl": "https://static.vecteezy.com/system/resources/thumbnails/026/376/618/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    "appointmentDate": "2026-06-16"
  },
  {
    "id": 8,
    "doctorName": "Dr. Daniel Clark",
    "department": "Ophthalmology",
    "specialization": "Eye Specialist",
    "experience": "7 Years",
    "fee": 950,
    "rating": 4.5,
    "availableDate": "2026-06-18",
    "availableTime": "12:00 PM",
    "description": "Eye care, vision testing, and treatment specialist.",
    "imageUrl": "https://static.vecteezy.com/system/resources/thumbnails/046/837/167/small_2x/confident-southeast-asian-female-doctor-in-white-coat-with-stethoscope-in-modern-medical-office-photo.jpg",
    "appointmentDate": "2026-06-18"
  },
  {
    "id": 9,
    "doctorName": "Dr. Isabella Moore",
    "department": "Psychiatry",
    "specialization": "Mental Health Specialist",
    "experience": "14 Years",
    "fee": 2000,
    "rating": 4.9,
    "availableDate": "2026-06-20",
    "availableTime": "05:15 PM",
    "description": "Mental health expert for anxiety, stress, and depression care.",
    "imageUrl": "https://static.vecteezy.com/system/resources/thumbnails/046/837/277/small_2x/confident-southeast-asian-male-doctor-in-modern-hospital-setting-with-medical-instruments-for-professional-healthcare-services-and-patient-care-photo.jpg",
    "appointmentDate": "2026-06-20"
  }
];

async function seed() {
  try {
    await client.connect();
    const db = client.db("docappoint");
    const doctorsCollection = db.collection("doctors");

    await doctorsCollection.deleteMany({});
    const result = await doctorsCollection.insertMany(doctors);
    console.log(`Seeded ${result.insertedCount} doctors with updated image URLs!`);
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await client.close();
  }
}

seed();
