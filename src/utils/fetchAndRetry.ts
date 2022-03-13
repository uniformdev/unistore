export async function fetchAndRetry(callAPIFn: any): Promise<any> {
  try {
    const response = await callAPIFn();
    return response;
  } catch (e) {
    console.log('Reached API throttling... sleeping');
    await sleep(3000);
    return fetchAndRetry(callAPIFn);
  }
}

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
