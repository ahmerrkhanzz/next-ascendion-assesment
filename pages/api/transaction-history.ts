// pages/api/transaction-history.ts
export default function handler(req: any, res: any) {
    const data = [
        { id: 1, date: '2025-06-18', type: 'Credit', amount: 100.0, recipient: 'Ali Raza' },
        { id: 2, date: '2025-06-17', type: 'Debit', amount: 50.5, recipient: 'Sara Khan' },
        { id: 3, date: '2025-06-16', type: 'Credit', amount: 200.75, recipient: 'John Doe' },
      ];
  
    res.status(200).json(data);
  }
  