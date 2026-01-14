import { useState } from "react";
import api from "../api/axios";

const AddEventForm = () => {
  const [form, setForm] = useState({
    eventName: "",
    endDate: "",
    registrationLink: "",
    organizerName: "",
    clubName: "",
    contactNumber: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/events", form);
    alert("Event added successfully");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4">Add Event</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          type={key === "endDate" ? "date" : "text"}
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

export default AddEventForm;