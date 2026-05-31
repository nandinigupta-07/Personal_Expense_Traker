import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// ✅ Component ke bahar — re-render pe focus nahi jayega
const PasswordInput = ({ placeholder, value, onChange, show, onToggle }) => (
  <div className="relative mb-4">
    <input
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-4 pr-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg"
    >
      {show ? "🙈" : "👁️"}
    </button>
  </div>
);

function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || user?.photoURL || ""
  );
  const [showImage, setShowImage] = useState(false);
  const [budget, setBudget] = useState(localStorage.getItem("budget") || "");
  const [currency, setCurrency] = useState("INR");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔐 Change Password States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState({ text: "", type: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🗑️ Delete Account States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMsg, setDeleteMsg] = useState({ text: "", type: "" });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeletePw, setShowDeletePw] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/transactions");
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.data)) data = res.data.data;
      else if (Array.isArray(res.data?.transactions)) data = res.data.transactions;
      setTransactions(data);
      const totals = data.reduce(
        (acc, t) => {
          const type = t.type?.toLowerCase();
          if (type === "income") acc.income += Number(t.amount) || 0;
          else if (type === "expense") acc.expense += Number(t.amount) || 0;
          return acc;
        },
        { income: 0, expense: 0 }
      );
      setIncome(totals.income);
      setExpense(totals.expense);
    } catch (err) {
      console.error("Transaction fetch error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
    fetchTransactions();
  }, [fetchTransactions]);

  const balance = income - expense;

  const handleLogout = () => {
    const savedPic = localStorage.getItem("profilePic");
    const savedTheme = localStorage.getItem("theme");
    localStorage.clear();
    if (savedPic) localStorage.setItem("profilePic", savedPic);
    if (savedTheme) localStorage.setItem("theme", savedTheme);
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setProfilePic(base64);
      localStorage.setItem("profilePic", base64);
    };
    reader.readAsDataURL(file);
  };

  const saveBudget = () => {
    localStorage.setItem("budget", budget);
    alert("Budget Saved!");
  };

  const toggleDarkMode = (e) => {
    e.preventDefault();
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang === "Hindi" ? "hi" : "en");
  };

  // 🔐 Change Password Handler
  const handleChangePassword = async () => {
    setPwMsg({ text: "", type: "" });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwMsg({ text: "❌ Saare fields fill karo", type: "error" });
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ text: "❌ New password kam se kam 6 characters ka hona chahiye", type: "error" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMsg({ text: "❌ New passwords match nahi kar rahe!", type: "error" });
      return;
    }
    if (currentPassword === newPassword) {
      setPwMsg({ text: "❌ New password aur current password same nahi ho sakte", type: "error" });
      return;
    }

    try {
      setPwLoading(true);
      await API.put("/auth/change-password", { currentPassword, newPassword });
      setPwMsg({ text: "✅ Password successfully change ho gaya!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // 2 second baad modal band karo
      setTimeout(() => {
        setShowPasswordModal(false);
        setPwMsg({ text: "", type: "" });
      }, 2000);
    } catch (err) {
      setPwMsg({
        text: "❌ " + (err?.response?.data?.message || "Kuch galat hua, dobara try karo"),
        type: "error",
      });
    } finally {
      setPwLoading(false);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPwMsg({ text: "", type: "" });
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  // 🗑️ Delete Account Handler
  const handleDeleteAccount = async () => {
    setDeleteMsg({ text: "", type: "" });

    if (!deletePassword) {
      setDeleteMsg({ text: "❌ Password daalo confirm karne ke liye", type: "error" });
      return;
    }
    if (deleteConfirmText !== "DELETE") {
      setDeleteMsg({ text: '❌ Confirmation box mein "DELETE" likho (capital letters mein)', type: "error" });
      return;
    }

    try {
      setDeleteLoading(true);
      await API.delete("/auth/delete-account", { data: { password: deletePassword } });
      setDeleteMsg({ text: "✅ Account delete ho gaya. Redirect ho raha hai...", type: "success" });
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 2000);
    } catch (err) {
      setDeleteMsg({
        text: "❌ " + (err?.response?.data?.message || "Kuch galat hua, dobara try karo"),
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
    setDeleteMsg({ text: "", type: "" });
    setShowDeletePw(false);
    setDeleteConfirmText("");
  };

  const Toggle = ({ value, onChange, color = "bg-green-500" }) => (
    <button
      type="button"
      onClick={onChange}
      className={`w-14 h-7 rounded-full transition-colors duration-200 ${value ? color : "bg-gray-400"}`}
    >
      <div className={`w-6 h-6 bg-white rounded-full mt-0.5 transition-transform duration-200 ${value ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-[#111827] border border-gray-300 dark:border-gray-700 p-6 rounded-3xl shadow-2xl mb-8 ${className}`}>
      {children}
    </div>
  );



  const maxAmount = (type) => {
    const filtered = transactions
      .filter((t) => t.type?.toLowerCase() === type)
      .map((t) => Number(t.amount) || 0);
    return filtered.length > 0 ? Math.max(...filtered) : 0;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">

        <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} className="hidden" />

        {/* Profile Header */}
        <Card className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={profilePic || "https://via.placeholder.com/120"}
                alt="profile"
                onClick={() => setShowImage(true)}
                className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover cursor-pointer hover:scale-105 transition shadow-xl"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">{user?.displayName || user?.name || "User"}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{user?.email}</p>
              <div className="flex gap-4 mt-5 flex-wrap justify-center md:justify-start">
                <button type="button" onClick={() => document.getElementById("fileInput").click()}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2 rounded-2xl font-medium shadow-lg hover:scale-105 transition">
                  Edit Profile
                </button>
                <button type="button" onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-medium shadow-lg hover:scale-105 transition">
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-5 rounded-3xl text-center shadow-2xl">
            <p className="text-sm text-white/80">Premium User</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">⭐ PRO</h3>
          </div>
        </Card>

        {/* Budget Settings */}
        <Card>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">💰 {t("budget")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Monthly Budget</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter budget"
                className="w-full p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-300">Budget Alerts</span>
              <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
            <button type="button" onClick={saveBudget}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition">
              Save Budget
            </button>
          </div>
        </Card>

        {/* Account Summary */}
        <Card>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">📊 Account Summary</h3>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { label: t("income"),    value: `₹${income}`,       bg: "bg-green-100 dark:bg-green-900/30",   color: "text-green-600 dark:text-green-400" },
                { label: t("expense"),   value: `₹${expense}`,      bg: "bg-red-100 dark:bg-red-900/30",       color: "text-red-600 dark:text-red-400" },
                { label: t("balance"),   value: `₹${balance}`,      bg: "bg-blue-100 dark:bg-blue-900/30",     color: "text-blue-600 dark:text-blue-400" },
                { label: "Transactions", value: transactions.length, bg: "bg-purple-100 dark:bg-purple-900/30", color: "text-purple-600 dark:text-purple-400" },
              ].map(({ label, value, bg, color }) => (
                <div key={label} className={`${bg} p-6 rounded-3xl`}>
                  <p className="text-gray-700 dark:text-gray-300">{label}</p>
                  <h4 className={`text-4xl font-bold ${color} mt-3`}>{value}</h4>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Preferences */}
        <Card>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">⚙️ Theme & Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-3xl">
              <p className="text-gray-700 dark:text-gray-300 mb-4">Dark Mode</p>
              <Toggle value={darkMode} onChange={toggleDarkMode} color="bg-indigo-500" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-3xl">
              <p className="text-gray-700 dark:text-gray-300 mb-4">Notifications</p>
              <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-3xl">
              <p className="text-gray-700 dark:text-gray-300 mb-4">Language</p>
              <select value={language} onChange={handleLanguageChange}
                className="w-full p-3 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🔐 Security</h3>
          <div className="flex flex-wrap gap-4">
            {/* ✅ Change Password Button — Working */}
            <button
              type="button"
              onClick={() => { setShowPasswordModal(true); setPwMsg({ text: "", type: "" }); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-xl transition hover:scale-105">
              Change Password
            </button>
            <button type="button" onClick={() => { setShowDeleteModal(true); setDeleteMsg({ text: "", type: "" }); }} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-xl transition">Delete Account</button>
            <button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-2xl shadow-xl transition">Logout All Devices</button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🕒 Recent Activity</h3>
          <div className="space-y-4">
            {[
              { label: "Last Login",      value: "Today, 6:30 PM",           color: "text-gray-500 dark:text-gray-400" },
              { label: "Highest Expense", value: `₹${maxAmount("expense")}`, color: "text-red-500" },
              { label: "Highest Income",  value: `₹${maxAmount("income")}`,  color: "text-green-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl">
                <p className="text-gray-900 dark:text-white font-medium">{label}</p>
                <p className={`${color} text-sm`}>{value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ✅ Change Password Modal */}
        {showPasswordModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={closePasswordModal}
          >
            <div
              className="bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">🔐 Change Password</h3>
                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  ✕
                </button>
              </div>

              {/* Inputs */}
              <PasswordInput
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                show={showCurrent}
                onToggle={() => setShowCurrent(!showCurrent)}
              />
              <PasswordInput
                placeholder="New Password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                show={showNew}
                onToggle={() => setShowNew(!showNew)}
              />
              <PasswordInput
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                show={showConfirm}
                onToggle={() => setShowConfirm(!showConfirm)}
              />

              {/* Message */}
              {pwMsg.text && (
                <div className={`mb-4 p-3 rounded-2xl text-sm font-medium text-center ${
                  pwMsg.type === "success"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}>
                  {pwMsg.text}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleChangePassword}
                  disabled={pwLoading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-2xl font-semibold transition"
                >
                  {pwLoading ? "Updating..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🗑️ Delete Account Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={closeDeleteModal}
          >
            <div
              className="bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-2xl w-full max-w-md border border-red-300 dark:border-red-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">🗑️ Delete Account</h3>
                <button type="button" onClick={closeDeleteModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  ✕
                </button>
              </div>

              {/* Warning */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
                <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                  ⚠️ <strong>Ye action permanent hai!</strong> Account delete hone ke baad:
                </p>
                <ul className="text-red-600 dark:text-red-400 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Saare transactions delete ho jaayenge</li>
                  <li>Profile aur data recover nahi hoga</li>
                  <li>Ye undo nahi ho sakta</li>
                </ul>
              </div>

              {/* Password Input */}
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Apna password confirm karo:
              </label>
              <div className="relative mb-4">
                <input
                  type={showDeletePw ? "text" : "password"}
                  placeholder="Current Password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button type="button" onClick={() => setShowDeletePw(!showDeletePw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                  {showDeletePw ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Confirmation Text */}
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Confirm karne ke liye <strong className="text-red-500">DELETE</strong> type karo:
              </label>
              <input
                type="text"
                placeholder='DELETE'
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full p-4 mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Message */}
              {deleteMsg.text && (
                <div className={`mb-4 p-3 rounded-2xl text-sm font-medium text-center ${
                  deleteMsg.type === "success"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}>
                  {deleteMsg.text}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <button type="button" onClick={handleDeleteAccount} disabled={deleteLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-2xl font-semibold transition">
                  {deleteLoading ? "Deleting..." : "Haan, Delete Karo"}
                </button>
                <button type="button" onClick={closeDeleteModal}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImage && (
          <div onClick={() => setShowImage(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img src={profilePic || "https://via.placeholder.com/120"} alt="preview"
                className="w-80 h-80 rounded-full border-4 border-white object-cover shadow-2xl" />
              <button type="button" onClick={() => setShowImage(false)}
                className="absolute -top-3 -right-3 bg-red-500 text-white w-10 h-10 rounded-full text-xl hover:bg-red-600 transition">✕</button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default Profile;
