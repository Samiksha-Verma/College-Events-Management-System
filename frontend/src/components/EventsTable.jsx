import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const { user } = useAuth();

  const fetchEvents = async (pageNum = 1) => {
    const res = await api.get(`/events?page=${pageNum}&limit=6`);
    setEvents(res.data.events);
    setPages(res.data.pages);
    setPage(res.data.page);
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await api.delete(`/events/${id}`);
    fetchEvents(page);
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Event Name</th>
            <th className="p-2 border">End Date</th>
            <th className="p-2 border">Register</th>
            <th className="p-2 border">Organizer</th>
            <th className="p-2 border">Club</th>
            <th className="p-2 border">Contact</th>
            {user.role === "admin" && (
              <th className="p-2 border">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {events.map((event, index) => (
            <tr key={event._id} className="text-center">
              <td className="border p-2">
                {(page - 1) * 6 + index + 1}
              </td>
              <td className="border p-2">{event.eventName}</td>
              <td className="border p-2">
                {new Date(event.endDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <a
                  href={event.registrationLink}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Link
                </a>
              </td>
              <td className="border p-2">{event.organizerName}</td>
              <td className="border p-2">{event.clubName}</td>
              <td className="border p-2">{event.contactNumber}</td>

              {user.role === "admin" && (
                <td className="border p-2">
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between p-4">
        <button
          disabled={page === 1}
          onClick={() => fetchEvents(page - 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          disabled={page === pages}
          onClick={() => fetchEvents(page + 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsTable;