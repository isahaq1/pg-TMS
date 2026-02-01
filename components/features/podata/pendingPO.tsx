"use client";

import { useEffect, useState } from "react";
import { pullPendingPOApprovals, POApproval } from '../../../services/poService'
import Loader from '../../common/loading-screen'

const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(amount));
};

export default function PendingPOs() {
  const [poApprovals, setPoApprovals] = useState<POApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingPOs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await pullPendingPOApprovals({
          RequestObject: {
            ApprovalLevel: "2",
            EmpId: "e0440",
          },
        });
        setPoApprovals(data);
      } catch (err: any) {
        console.error("Error fetching PO approvals:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPOs();
  }, []);

  if (loading) {
    return (
        <Loader/>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Data</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Pending PO Approvals</h1>
            <p className="text-sm text-gray-600 mt-1">Approval Level 2 - Employee: e0440</p>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Order No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Branch</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Qty Range</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Rate</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Total Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Due Date</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {poApprovals.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-gray-500">
                      No pending approvals found
                    </td>
                  </tr>
                ) : (
                  poApprovals.map((po, index) => (
                    <tr key={`${po.OrderNo}-${index}`} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-900">{po.Date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{po.OrderNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{po.Supplier}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="font-medium">{po.Item}</div>
                        <div className="text-xs text-gray-500">{po.ItemOrLedgerGroup}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={po.Branch}>
                        {po.Branch}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(po.MinQty)} - {formatCurrency(po.MaxQty)} {po.Unit}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(po.Rate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                        {formatCurrency(po.TotalAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{po.DueDate}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {po.Status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Total Records: <span className="font-semibold">{poApprovals.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
