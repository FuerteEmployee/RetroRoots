const updates = [
  "🚀 New Marble Collection 2026 Launched",
  "📍 Now Exporting to 15+ Countries",
  "🏆 ISO 9001:2025 Certified",
  "🎪 Visit Us at Ceramica India Expo — Booth A12",
  "🆕 Premium Kitchen Series Available Now",
];

const DailyUpdates = () => (
  <div className="bg-primary overflow-hidden py-2.5">
    <div className="flex whitespace-nowrap marquee">
      {[...updates, ...updates].map((item, i) => (
        <span key={i} className="mx-8 text-sm font-medium text-primary-foreground">{item}</span>
      ))}
    </div>
  </div>
);

export default DailyUpdates;
