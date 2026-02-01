export interface PullPendingPOApprovalsRequest {
  RequestObject: {
    ApprovalLevel: string;
    EmpId: string;
  };
}

export interface POApproval {
  Date: string;
  Supplier: string;
  OrderNo: string;
  RefNo: string;
  DueDate: string;
  Branch: string;
  RequisitionType: string;
  ItemOrLedgerGroup: string;
  Item: string;
  MinQty: string;
  MaxQty: string;
  Unit: string;
  Rate: string;
  LastApprovedRate: string;
  LastSupplier: string;
  TotalAmount: string;
  Status: string;
  DeliveryType: string;
}

interface APIResponse {
  PoPendingData: {
    Data: POApproval[];
  };
}

export const pullPendingPOApprovals = async (
  data: PullPendingPOApprovalsRequest
): Promise<POApproval[]> => {
  const response = await fetch("/api/proxy-po", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const result: APIResponse = await response.json();
  
  // Return the data array from the API response
  return result.PoPendingData?.Data || [];
};
