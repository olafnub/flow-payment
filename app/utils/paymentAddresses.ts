// In a real app, this would be stored in a database
let activePaymentAddresses: {
  address: string;
  amount: number;
  timestamp: Date;
  productName: string;
  isUsed: boolean;
}[] = [];

export const addPaymentAddress = (address: string, amount: number, productName: string) => {
  activePaymentAddresses.push({
    address,
    amount,
    timestamp: new Date(),
    productName,
    isUsed: false
  });
};

export const verifyPaymentAddress = (address: string) => {
  const paymentAddress = activePaymentAddresses.find(pa => pa.address === address);
  if (!paymentAddress) {
    return {
      isValid: false,
      message: 'This payment address is not recognized.',
      details: null
    };
  }

  if (paymentAddress.isUsed) {
    return {
      isValid: false,
      message: 'This payment address has already been used.',
      details: null
    };
  }

  // Check if the address is not expired (24 hours validity)
  const now = new Date();
  const validityPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  if (now.getTime() - paymentAddress.timestamp.getTime() > validityPeriod) {
    return {
      isValid: false,
      message: 'This payment address has expired.',
      details: null
    };
  }

  return {
    isValid: true,
    message: 'This is a valid payment address.',
    details: paymentAddress
  };
};

// For demo purposes only - in a real app, this would be handled by your backend
export const getActiveAddresses = () => {
  return activePaymentAddresses;
};
