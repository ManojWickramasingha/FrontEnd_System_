import React from "react";
import BudgetDashboard from "../../../components/BudgetComponents/Budgetdashboard";


const UserBudgetPage = () => {
    return (
        <div className="pageTemplate2">
          <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Budget</h1>
          <div className="budgetpage">
            <BudgetDashboard />
          </div>
        </div>
    );
};

export default UserBudgetPage;

