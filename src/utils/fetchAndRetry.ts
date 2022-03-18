import pRetry from 'p-retry';
import pLimit from 'p-limit';

const limit = pLimit(4);

export async function fetchAndRetry<T>(callAPIFn: () => Promise<T>): Promise<T> {
  const response = limit(() => pRetry(callAPIFn));
  return response;
}
