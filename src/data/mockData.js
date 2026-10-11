// mockData.js - all the fake data used in the app
// When you add a real backend, you'll replace this with API calls

export const channels = [
  { id: 1, name: "general", unread: 0 },
  { id: 2, name: "announcements", unread: 0 },
  { id: 3, name: "project-alpha", unread: 4 },
  { id: 4, name: "dev-team", unread: 0 },
];

export const directMessages = [
  {
    id: 1,
    name: "Ali Hassan",
    initials: "AH",
    color: "#f97316",
    time: "2:44",
    preview: "Sounds good, see you then!",
    unread: 2,
  },
  {
    id: 2,
    name: "Sara Khan",
    initials: "SK",
    color: "#22c55e",
    time: "1:30",
    preview: "Meeting confirmed at 3pm",
    unread: 0,
  },
  {
    id: 3,
    name: "M. Usman",
    initials: "MU",
    color: "#8b5cf6",
    time: "Mon",
    preview: "Will review by end of day",
    unread: 0,
  },
];

export const generalMessages = [
  {
    id: 1,
    sender: "Ali Hassan",
    initials: "AH",
    color: "#f97316",
    time: "9:01 AM",
    text: "Good morning team! Reminder — Q3 review meeting at 3pm in Conference Room B.",
    isMe: false,
  },
  {
    id: 2,
    sender: "Sara Khan",
    initials: "SK",
    color: "#22c55e",
    time: "9:15 AM",
    text: "Thanks for the reminder! I'll have the slides ready by 2pm.",
    isMe: false,
  },
  {
    id: 3,
    sender: "You",
    initials: "TJ",
    color: "#f97316",
    time: "9:18 AM",
    text: "On it. I'll prepare the dev progress report and share it here before the meeting.",
    isMe: true,
    ticks: true,
  },
  {
    id: 4,
    sender: "Ali Hassan",
    initials: "AH",
    color: "#f97316",
    time: "9:22 AM",
    text: "Perfect. Also check #project-alpha — there are important updates from this morning.",
    isMe: false,
  },
];

export const teamMembers = [
  { id: 1, name: "Ali Hassan", initials: "AH", color: "#f97316", role: "Developer" },
  { id: 2, name: "Sara Khan", initials: "SK", color: "#22c55e", role: "Designer" },
  { id: 3, name: "M. Usman", initials: "MU", color: "#8b5cf6", role: "Manager" },
  { id: 4, name: "Raza Noor", initials: "RN", color: "#eab308", role: "QA Engineer" },
];
