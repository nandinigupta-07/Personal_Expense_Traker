function Card({ className = "", children }) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow hover:shadow-xl transition ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
