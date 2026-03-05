import React, { useEffect, useState } from "react";
import { getStudentTransport } from "../../../../../services/dataProvider";

const TransportView = () => {
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const data = await getStudentTransport();
        setTransport(data || null);
      } catch (err) {
        console.error("Error fetching transport info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransport();
  }, []);

  const statusBadge = (status) => {
    switch (status) {
      case "on_bus":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            On bus
          </span>
        );
      case "other_bus":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            Different bus
          </span>
        );
      case "not_on_bus":
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
            Not boarded
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p>Loading transport data...</p>
      </div>
    );
  }

  if (!transport) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p>No bus route has been applied for.</p>
      </div>
    );
  }

  const { route, pickupPoint, timing, stops, attendance, monthlyFare } = transport;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column: summary + attendance */}
      <div className="lg:col-span-1 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Route Summary</h3>
          <p className="text-sm text-gray-600"><span className="font-medium">Route:</span> {route}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Pickup:</span> {pickupPoint}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Pickup time:</span> {timing}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Monthly Fare:</span> ₹{monthlyFare ?? '—'}</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-gray-700">{attendance?.busId ? `Bus: ${attendance.busId}` : 'Assigned bus not available'}</div>
              <div className="text-sm text-gray-600">{attendance?.message ?? ''}</div>
            </div>
            <div>{statusBadge(attendance?.status)}</div>
          </div>
        </div>
      </div>

      {/* Right column: stops table (span 2 cols on lg) */}
      <div className="lg:col-span-2">
        <div className="p-4 bg-white rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold mb-3">Stop Timings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stops && stops.length > 0 ? (
                  stops.map((s, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{idx + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{s.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{s.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-sm text-gray-500">No stops available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm text-gray-600">No recent bus activity available. Connect real-time tracking to show live updates.</p>
        </div>
      </div>
    </div>
  );
};

export default TransportView;