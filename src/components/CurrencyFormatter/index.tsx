import React from 'react';
import { GetCartResponse } from '@/typings/cartTypes';

type Props = {
  currency: GetCartResponse['data']['currency']['code'];
  amount?: number;
  className?: string;
};

const CurrencyFormatter = ({ currency, amount, className }: Props) => {
  if (typeof amount === 'undefined') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  const languageCode = typeof window !== 'undefined' ? window.navigator.language || 'en-US' : 'en-US';
  const formattedPrice = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency,
  }).format(amount);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <div className={className}>{amount && formattedPrice}</div>;
};

export default CurrencyFormatter;
