import { NextPageContext } from 'next';
import React from 'react';

type ErrorComponentProps = {
  statusCode: number;
};

const ErrorComponent = ({ statusCode }: ErrorComponentProps): JSX.Element => (
  <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
);

ErrorComponent.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorComponent;
