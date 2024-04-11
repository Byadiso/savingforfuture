import { listTransactions } from "./getTransactions";

export const getCurrentMonthRange = () => {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setMonth(end.getMonth() + 1);
  end.setDate(0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getLastMonthRange = () => {
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setMonth(end.getMonth());
  end.setDate(0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getYearRange = () => {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const end = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
  return { start, end };
};

export const fetchFilteredTransactions = async (
  filterType,
  searchTerm,
  setData
) => {
  let dateRange;

  switch (filterType) {
    case "currentMonth":
      dateRange = getCurrentMonthRange();
      break;
    case "lastMonth":
      dateRange = getLastMonthRange();
      break;
    case "wholeYear":
      dateRange = getYearRange();
      break;
    default:
      // If no date filter is selected, default to not filtering by date
      dateRange = null;
  }

  try {
    const allTransactions = await listTransactions(); // Adjust to actually fetch transactions
    const filteredTransactions = allTransactions.filter((transaction) => {
      const matchesDate = dateRange
        ? new Date(transaction.createdAt) >= dateRange.start &&
          new Date(transaction.createdAt) <= dateRange.end
        : true; // If no dateRange is provided, don't filter by date
      const matchesSearchTerm = searchTerm
        ? transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true; // If no searchTerm is provided, don't filter by term

      return matchesDate && matchesSearchTerm;
    });

    setData(filteredTransactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }
};

// Example button handlers
export const handleCurrentMonth = () =>
  fetchFilteredTransactions("currentMonth");
export const handleLastMonth = () => fetchFilteredTransactions("lastMonth");
export const handleWholeYear = () => fetchFilteredTransactions("wholeYear");

// filter and return total and list
export function filterTransactionsAndCalculateTotal(transactions, keywords) {
  let totalExpense = 0;
  let totalIncome = 0;
  const sortedTransactions = transactions.sort(
    (a, b) => b.createdAt - a.createdAt
  );
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const matchesKeyword = keywords.some((keyword) =>
      transaction.title.toLowerCase().includes(keyword)
    );
    if (matchesKeyword) {
      if (transaction.type === "Income") {
        totalExpense += parseFloat(transaction.amount);
      } else if (transaction.type === "Expense") {
        totalIncome += parseFloat(transaction.amount);
      }
    }
    return matchesKeyword;
  });

  let total = totalExpense - totalIncome;

  return {
    filteredTransactions,
    total,
  };
}

export function listAlltransactionWithoutSuper(transactions, filterKeywords) {
  let totalExpense = 0;
  let totalIncome = 0;
  transactions.filter((transaction) => {
    const matchesKeyword = filterKeywords.some((keyword) =>
      transaction.title.toLowerCase().includes(keyword)
    );
    if (!matchesKeyword) {
      if (transaction.type === "Expense") {
        totalExpense += parseFloat(transaction.amount);
      } else if (transaction.type === "Income") {
        totalIncome += parseFloat(transaction.amount);
      }
    }
    return matchesKeyword;
  });
  return { totalExpense, totalIncome };
}

// filter and return total and list
export function filterBenefits(transactions) {
  let totalIncome = 0;
  if (!transactions) {
    return {
      filteredTransactions: [],
      totalIncome: 0,
    };
  }

  const sortedTransactions = transactions.sort((a, b) => b.createdAt - a.createdAt);

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    if (transaction.type === "Extra") {
      totalIncome += parseFloat(transaction.amount); 
      return true; 
    }
    return false; 
  });

  return {
    filteredTransactions,
    totalIncome, 
  };
}


// export function listAlltransactionWithoutSuper(transactions, keywords) {
//   let totalExpense = 0;
//   let totalIncome = 0
//   const sortedTransactions = transactions.sort((a, b) => b.createdAt - a.createdAt);
//   const filteredTransactions = sortedTransactions.filter(transaction => {
//       const matchesKeyword = keywords.some(keyword => transaction.title.toLowerCase().includes(keyword));
//       if (matchesKeyword) {
//         if(transaction.type === "Income"){
//           totalExpense += parseFloat(transaction.amount);
//         } else if (transaction.type === "Expense"){
//           totalIncome += parseFloat(transaction.amount);
//         }

//       }
//       return matchesKeyword;
//   });

//   let total =  totalExpense - totalIncome;

//   return {
//       filteredTransactions,
//       total,
//   };
// }
