// mockData.js
export const mockComplaints = [
  {
    id: 1,
    studentName: "John Doe",
    hostel: "Hostel A",
    roomNumber: "101",
    category: "Electricity",
    description: "Light bulb in room is not working.",
    status: "Pending",
    dateSubmitted: "2023-10-01"
  },
  {
    id: 2,
    studentName: "Jane Smith",
    hostel: "Hostel B",
    roomNumber: "202",
    category: "Plumbing",
    description: "Tap is leaking in the bathroom.",
    status: "Resolved",
    dateSubmitted: "2023-09-28"
  },
  {
    id: 3,
    studentName: "Alice Johnson",
    hostel: "Hostel C",
    roomNumber: "303",
    category: "Wi-Fi",
    description: "Internet connection is very slow.",
    status: "Pending",
    dateSubmitted: "2023-10-02"
  },
  {
    id: 4,
    studentName: "Bob Brown",
    hostel: "Hostel D",
    roomNumber: "404",
    category: "Cleanliness",
    description: "Common area needs cleaning.",
    status: "Resolved",
    dateSubmitted: "2023-09-30"
  },
  {
    id: 5,
    studentName: "Charlie Wilson",
    hostel: "Hostel A",
    roomNumber: "105",
    category: "Furniture",
    description: "Chair is broken.",
    status: "Pending",
    dateSubmitted: "2023-10-03"
  }
];

export const complaintCategories = [
  "Electricity",
  "Plumbing",
  "Water",
  "Wi-Fi",
  "Furniture",
  "Cleanliness",
  "Other"
];

export const hostels = ["Hostel A", "Hostel B", "Hostel C", "Hostel D"];

export const statuses = ["Pending", "Resolved"];

