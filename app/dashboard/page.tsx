'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/transaction-history');
      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Reference ID</th>
              <th className="border p-2 text-left">To</th>
              <th className="border p-2 text-left">Transaction Type</th>
              <th className="border p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any) => (
              <tr key={row.id} className="even:bg-gray-50">
                <td className="border p-2">{row.date}</td>
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.recipient}</td>
                <td className="border p-2">{row.type}</td>
                <td className="border p-2">${row.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
