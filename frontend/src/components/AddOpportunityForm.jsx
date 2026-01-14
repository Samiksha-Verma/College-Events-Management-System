import { useState } from "react";
import api from "../api/axios";

const AddOpportunityForm = () => {
  const [form, setForm] = useState({
    roleName: "",
    closingDate: "",
    registrationLink: "",
    companyName: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (
      !form.registrationLink.startsWith("http://") &&
      !form.registrationLink.startsWith("https://")
    ) {
      alert("Please enter a valid URL starting with https://");
      return;
    }

    await api.post("/opportunities", form);
    alert("Opportunity added successfully");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4">Add Opportunity</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          type={key === "closingDate" ? "date" : "text"}
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button className="bg-black text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default AddOpportunityForm;