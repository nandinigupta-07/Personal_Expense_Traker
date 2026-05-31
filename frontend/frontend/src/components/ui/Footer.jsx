function Footer({ text = "© 2026 Expense Tracker | Made with ❤️", className = "" }) {
  return (
    <footer className={`bg-gray-900 text-gray-400 text-center py-4 ${className}`}>
      {text}
    </footer>
  );
}

export default Footer;
