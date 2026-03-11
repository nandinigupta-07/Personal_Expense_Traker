import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const res = await API.get("/transactions");

      const data = res.data;

      setTransactions(data);

      let totalIncome = 0;
      let totalExpense = 0;

      data.forEach((t) => {
        if (t.type === "income") {
          totalIncome += t.amount;
        } else {
          totalExpense += t.amount;
        }
      });

      setIncome(totalIncome);
      setExpense(totalExpense);

    } catch (error) {
      console.log(error);
    }
  };

  const balance = income - expense;

  return (
    <>
      <Navbar />

      <div style={styles.container}>

        <h1>Dashboard</h1>

        <div style={styles.cardContainer}>

          <div style={styles.card}>
            <h3>Total Income</h3>
            <p style={{color:"green"}}>₹ {income}</p>
          </div>

          <div style={styles.card}>
            <h3>Total Expense</h3>
            <p style={{color:"red"}}>₹ {expense}</p>
          </div>

          <div style={styles.card}>
            <h3>Balance</h3>
            <p style={{color:"blue"}}>₹ {balance}</p>
          </div>

        </div>

        <h2 style={{marginTop:"40px"}}>Recent Transactions</h2>

        <table style={styles.table}>

          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {transactions.slice(0,5).map((t) => (
              <tr key={t._id}>
                <td>{t.category?.name}</td>
                <td>₹ {t.amount}</td>
                <td>{t.type}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

const styles = {

  container: {
    padding: "40px",
    fontFamily: "Arial"
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  },

  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse"
  }
  

};


export default Dashboard;