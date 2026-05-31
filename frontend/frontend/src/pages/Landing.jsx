 import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import Navbar from "../components/navigation/Navbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Footer from "../components/ui/Footer";

const featureItems = [
  {
    title: "Expense Tracking",
    description: "Track all your daily expenses and income easily"
  },
  {
    title: "Budget Planning",
    description: "Set monthly budgets and control overspending"
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize spending with beautiful charts and reports"
  }
];

const stats = [
  {
    number: "10K+",
    label: "Transactions Managed"
  },
  {
    number: "95%",
    label: "Budget Accuracy"
  },
  {
    number: "24/7",
    label: "Access Anywhere"
  }
];

const testimonials = [
  {
    name: "Rahul",
    review: "This app helped me save money every month!"
  },
  {
    name: "Priya",
    review: "Very clean UI and super easy to use."
  },
  {
    name: "Aman",
    review: "Best finance tracker project I've used so far."
  }
];

function Landing() {
  const navigate = useNavigate();

  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      <Navbar
    brand="ExpenseTracker"
    links={[
       
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" }
    ]}
  />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Manage Your Money Like a Pro 💸
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Track expenses, manage budgets, and analyze your spending with real-time insights.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Button
              onClick={() => navigate("/login")}
              variant="light"
              className="px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition"
            >
              Get Started
            </Button>

            <Button
              variant="secondary"
              onClick={scrollToFeatures}
              className="px-8 py-3 rounded-xl text-lg hover:scale-105 transition"
            >
              Learn More
            </Button>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 px-6 md:px-16 bg-white"
      >

        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Powerful Features 🚀
        </h2>

        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Everything you need to manage your personal finances efficiently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {featureItems.map(({ title, description }) => (

            <Card
              key={title}
              className="p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center border border-gray-100"
            >

              <div className="text-5xl mb-4">💰</div>

              <h3 className="font-bold text-2xl mb-3 text-gray-800">
                {title}
              </h3>

              <p className="text-gray-500">
                {description}
              </p>

            </Card>

          ))}

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-6 md:px-16">

          {stats.map(({ number, label }) => (

            <div
              key={label}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
            >

              <h2 className="text-5xl font-bold mb-3">
                {number}
              </h2>

              <p className="text-lg text-gray-200">
                {label}
              </p>

            </div>

          ))}

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-16 bg-gray-100">

        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Users Say ❤️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {testimonials.map(({ name, review }) => (

            <Card
              key={name}
              className="p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >

              <p className="text-gray-600 italic mb-4">
                “{review}”
              </p>

              <h4 className="font-bold text-lg text-gray-800">
                - {name}
              </h4>

            </Card>

          ))}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-gradient-to-br from-purple-700 to-indigo-700 text-white px-6">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Start Managing Your Money Today 🚀
        </h2>

        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          Take control of your finances with smart tracking and beautiful analytics.
        </p>

        <Button
          onClick={() => navigate("/login")}
          variant="light"
          className="px-10 py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition"
        >
          Go to Login
        </Button>

      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Landing;