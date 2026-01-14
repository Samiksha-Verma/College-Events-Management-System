import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const OpportunitiesTable = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const { user } = useAuth();

  const fetchOpportunities = async (pageNum = 1) => {
    const res = await api.get(`/opportunities?page=${pageNum}&limit=6`);
    setOpportunities(res.data.opportunities);
    setPages(res.data.pages);
    setPage(res.data.page);
  };

  useEffect(() => {
    fetchOpportunities(1);
  }, []);

  const deleteOpportunity = async (id) => {
    if (!window.confirm("Delete this opportunity?")) return;
    await api.delete(`/opportunities/${id}`);
    fetchOpportunities(page);
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Closing Date</th>
            <th className="p-2 border">Register</th>
            <th className="p-2 border">Company</th>
            {user.role === "admin" && (
              <th className="p-2 border">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {opportunities.map((op, index) => (
            <tr key={op._id} className="text-center">
                {console.log(op.registrationLink)}
              <td className="border p-2">
                {(page - 1) * 6 + index + 1}
              </td>
              <td className="border p-2">{op.roleName}</td>
              <td className="border p-2">
                {new Date(op.closingDate).toLocaleDateString()}
              </td>
        <td className="border p-2">
                <a
                  href={op.registrationLink}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Link
                </a>
                </td>
              <td className="border p-2">{op.companyName}</td>

              {user.role === "admin" && (
                <td className="border p-2">
                  <button
                    onClick={() => deleteOpportunity(op._id)}
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
          onClick={() => fetchOpportunities(page - 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          disabled={page === pages}
          onClick={() => fetchOpportunities(page + 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OpportunitiesTable;