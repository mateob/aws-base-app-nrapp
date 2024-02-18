export const stringifyResponse = () => {
  const stringifyResponseAfter = async (request) => {
    if (request.response.body && typeof request.response.body === 'object') {
      request.response.body = JSON.stringify(request.response.body);
    }
  };
  return {
    after: stringifyResponseAfter,
  };
};
