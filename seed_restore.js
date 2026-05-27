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
    "imageUrl": "https://i.ibb.co/8D0Z8mK/doctor1.png",
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
    "imageUrl": "https://i.ibb.co/F7m6V7M/doctor2.png",
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
    "imageUrl": "https://i.ibb.co/k2G8W7L/doctor3.png",
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
    "imageUrl": "https://i.ibb.co/Y0b5L8n/doctor4.png",
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
    "imageUrl": "https://i.ibb.co/JqXx5xM/doctor5.png",
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
    "imageUrl": "https://i.ibb.co/0jQK9xM/doctor6.png",
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
    "imageUrl": "https://i.ibb.co/9v8h6s4/doctor7.png",
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
    "imageUrl": "https://i.ibb.co/3m8gL6K/doctor8.png",
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
    "imageUrl": "https://i.ibb.co/QX1b2dM/doctor9.png",
    "appointmentDate": "2026-06-20"
  }
];

