// Mock data for Eretz-Ir MVP
const MOCK_DATA = [
  { id: 1, name: "דוד", score: 120, wins: 5 },
  { id: 2, name: "שרה", score: 95, wins: 3 },
  { id: 3, name: "יוסף", score: 80, wins: 2 },
  { id: 4, name: "מיכל", score: 110, wins: 4 },
  { id: 5, name: "אברהם", score: 70, wins: 1 },
  { id: 6, name: "רחל", score: 105, wins: 3 }
];

const CATEGORIES = ["ארץ", "עיר", "חיה", "צמח", "מאכל", "שם", "מקצוע", "כלי רכב"];

const LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];

// Export for use in app.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MOCK_DATA, CATEGORIES, LETTERS };
}