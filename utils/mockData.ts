// Töleg hasaplamalary üçin görnüşler
export type Bill = {
  id: string;
  utility: string; // hyzmatyň görnüşi (Elektrik, Suw, Gaz, Internet)
  accountNumber: string; // hasap belgisi
  amount: number; // töleg mukdary
  dueDate: string; // soňky töleg güni
  billingPeriod: string; // hasaplaşyk döwri
  status: string; // ýagdaýy (Tölenmeli, Tölenildi)
  isPaid: boolean; // tölenip-tölenilmedigi
  iconBgColor: string; // ikonanyň fon reňki
};

export type Transaction = {
  id: string;
  description: string; // düşündiriş
  amount: number; // mukdary
  date: string; // senesi
  paymentMethod: string; // töleg usuly
};

// Töleg hasaplary üçin nusga maglumatlar
const bills: Bill[] = [
  {
    id: '1',
    utility: 'Elektrik',
    accountNumber: 'ELEC-10234568',
    amount: 87.45,
    dueDate: '2025-10-15',
    billingPeriod: '2025-09-01 - 2025-09-30',
    status: 'Tölenmeli',
    isPaid: false,
    iconBgColor: '#f39c12',
  },
  {
    id: '2',
    utility: 'Suw',
    accountNumber: 'WAT-78945612',
    amount: 43.20,
    dueDate: '2025-10-20',
    billingPeriod: '2025-09-01 - 2025-09-30',
    status: 'Tölenmeli',
    isPaid: false,
    iconBgColor: '#3498db',
  },
  {
    id: '3',
    utility: 'Gaz',
    accountNumber: 'GAS-45678912',
    amount: 153.90,
    dueDate: '2025-10-25',
    billingPeriod: '2025-09-01 - 2025-09-30',
    status: 'Tölenmeli',
    isPaid: false,
    iconBgColor: '#e74c3c',
  },
  {
    id: '4',
    utility: 'Internet',
    accountNumber: 'INT-36985214',
    amount: 79.99,
    dueDate: '2025-09-28',
    billingPeriod: '2025-09-01 - 2025-09-30',
    status: 'Tölenildi',
    isPaid: true,
    iconBgColor: '#9b59b6',
  },
  {
    id: '5',
    utility: 'Elektrik',
    accountNumber: 'ELEC-10234568',
    amount: 92.34,
    dueDate: '2025-09-15',
    billingPeriod: '2025-08-01 - 2025-08-31',
    status: 'Tölenildi',
    isPaid: true,
    iconBgColor: '#f39c12',
  },
];

// Töleg geçirimleri üçin nusga maglumatlar
const transactions: Transaction[] = [
  {
    id: 'txn-1',
    description: 'Internet töleg geçirimi',
    amount: 79.99,
    date: '2025-09-28',
    paymentMethod: 'Kredit kartoçkasy',
  },
  {
    id: 'txn-2',
    description: 'Elektrik töleg geçirimi',
    amount: 92.34,
    date: '2025-09-15',
    paymentMethod: 'Bank hasaby',
  },
  {
    id: 'txn-3',
    description: 'Suw töleg geçirimi',
    amount: 39.75,
    date: '2025-08-20',
    paymentMethod: 'Kredit kartoçkasy',
  },
  {
    id: 'txn-4',
    description: 'Gaz töleg geçirimi',
    amount: 135.62,
    date: '2025-08-25',
    paymentMethod: 'Bank hasaby',
  },
  {
    id: 'txn-5',
    description: 'Elektrik töleg geçirimi',
    amount: 88.12,
    date: '2025-08-15',
    paymentMethod: 'Kredit kartoçkasy',
  },
  {
    id: 'txn-6',
    description: 'Internet töleg geçirimi',
    amount: 79.99,
    date: '2025-07-28',
    paymentMethod: 'Kredit kartoçkasy',
  },
  {
    id: 'txn-7',
    description: 'Suw töleg geçirimi',
    amount: 41.25,
    date: '2025-07-20',
    paymentMethod: 'Bank hasaby',
  },
];

// Ulanylýan kömekçi funksiýalar
export const getBills = (): Bill[] => {
  return bills;
};

export const getBillById = (id: string): Bill => {
  const foundBill = bills.find(bill => bill.id === id);
  if (!foundBill) {
    throw new Error(`ID-si ${id} bolan hasap tapylmady`);
  }
  return foundBill;
};

export const getRecentTransactions = (): Transaction[] => {
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getTransactionHistory = (): Transaction[] => {
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
