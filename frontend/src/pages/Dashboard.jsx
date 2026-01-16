import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventsTable from "../components/EventsTable";
import OpportunitiesTable from "../components/OpportunitiesTable";
import AddEventForm from "../components/AddEventForm";
import AddOpportunityForm from "../components/AddOpportunityForm";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          College Events & Opportunities
        </h1>

       <button
        onClick={() => {
            logout();
            navigate("/"); // always go to login page
        }}
        className="bg-black text-white px-4 py-2 rounded-lg"
        >
        Logout
        </button>
      </div>

      {/* MAIN TABS */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2 rounded-lg border transition ${
            activeTab === "events"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setActiveTab("opportunities")}
          className={`px-4 py-2 rounded-lg border transition ${
            activeTab === "opportunities"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          Opportunities
        </button>

        {/* ADMIN BUTTONS */}
        {user?.role === "admin" && (
          <>
            <button
              onClick={() => setActiveTab("addEvent")}
              className={`px-4 py-2 rounded-lg border transition ${
                activeTab === "addEvent"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              + Add Event
            </button>

            <button
              onClick={() => setActiveTab("addOpportunity")}
              className={`px-4 py-2 rounded-lg border transition ${
                activeTab === "addOpportunity"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              + Add Opportunity
            </button>
          </>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {activeTab === "events" && <EventsTable />}
        {activeTab === "opportunities" && <OpportunitiesTable />}
        {activeTab === "addEvent" && <AddEventForm />}
        {activeTab === "addOpportunity" && <AddOpportunityForm />}
      </div>
    </div>
  );
};

export default Dashboard;