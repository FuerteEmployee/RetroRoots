const updates = [
  "Designed To Last, Styled To Love",
  "Vintage Soul, Modern Style",
  "Where Classic Design Meets Modern Living",
  "Designs That Echo The Past",
  "Simply Classic, Quietly Luxurious",
  "Vintage Elegance Made Modern",
];

const DailyUpdates = () => (
  <div className="bg-black overflow-hidden py-2.5">
    <div className="flex whitespace-nowrap marquee">
      {[...updates, ...updates].map((item, i) => (
        <span key={i} className="mx-8 text-sm font-medium text-white">{item}</span>
      ))}
    </div>
  </div>
);

export default DailyUpdates;
