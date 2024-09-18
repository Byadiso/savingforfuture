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
      if (transaction.type === "Income" || "income") {
        totalExpense += parseFloat(transaction.amount);
      } else if (transaction.type === "Expense" || "expense") {
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

// export function listAlltransactionWithoutSuper(transactions, filterKeywords) {
//   let totalExpense = 0;
//   let totalIncome = 0;
//   transactions.filter((transaction) => {
//     const matchesKeyword = filterKeywords.some((keyword) =>
//       transaction.title.toLowerCase().includes(keyword)
//     );
//     if (!matchesKeyword) {
//       if (transaction.type === "Expense" || "expense") {
//         totalExpense += parseFloat(transaction.amount);
//       } else if (transaction.type === "Income"|| "income") {
//         totalIncome += parseFloat(transaction.amount);
//       }else{
//         totalIncome=0
//         totalExpense = 0
//       }
//     }
//     return !matchesKeyword;
//   });
//   return { totalExpense, totalIncome };
// }

export function listAlltransactionWithoutSuper(transactions, filterKeywords) {
  let totalExpense = 0;
  let totalIncome = 0;

transactions.filter((transaction) => {
    // Convert type to lowercase for case-insensitive comparison
    const type = transaction.type.toLowerCase();

    // Check if transaction title matches any of the filter keywords
    const matchesKeyword = filterKeywords.some((keyword) =>
      transaction.title.toLowerCase().includes(keyword)
    );

    // Only consider transactions that do not match any filter keyword
    if (!matchesKeyword) {
      // Accumulate total expenses and income based on transaction type
      if (type === "expense") {
        totalExpense += parseFloat(transaction.amount) || 0;
      } else if (type === "income") {
        totalIncome += parseFloat(transaction.amount) || 0;
      }
    }

    // Return true if the transaction does not match the filter keywords
    return !matchesKeyword;
  });

  return { totalExpense, totalIncome };
}


// filter and return total and list

export function filterBenefits(transactions) {
  let totalBenefits = 0;

  if (!transactions) {
    return {
      filteredBenefits: [],
      totalBenefits: 0,
    };
  }

  // Sort transactions by createdAt date in descending order
  const sortedTransactions = transactions.sort((a, b) => b.createdAt - a.createdAt);
  
  // Filter transactions to include only those with type "extra" or "Extra"
  const filteredBenefits = sortedTransactions.filter((transaction) => {
    const type = transaction.type.toLowerCase(); // Normalize type to lowercase
    if (type === "extra") {
      totalBenefits += parseFloat(transaction.amount) || 0; // Safely parse amount
      return true;
    }
    return false;
  });

 
  return {
    filteredBenefits,
    totalBenefits,
  };
}




