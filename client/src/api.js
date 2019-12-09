const mocks = {
  time: 180,
  percentage: 0
};
const shouldUseMock = process.env.NODE_ENV === 'development';

const mockRequest = (endpoint, mockData, useJson = true, time = 1000) => req =>
  new Promise(resolve =>
    setTimeout(() => {
      const data = typeof mockData === 'function' ? mockData(req) : mockData;
      resolve(
        useJson
          ? {
              json: () => Promise.resolve(data)
            }
          : data
      );
      console.log(`Mocked ${endpoint} response:`, data);
    }, time)
  );

const jsonRequestBody = (body = {}) => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...body })
});

const api = {
  getId: shouldUseMock
    ? mockRequest('/id', { id: 0 })
    : () =>
        fetch('/id', {
          method: 'GET'
        }),
  getTime: shouldUseMock
    ? mockRequest(
        '/time',
        () => {
          if (mocks.time > 0) mocks.time -= 1;
          return { time: mocks.time };
        },
        true,
        500
      )
    : fetch('/time', {
        method: 'GET'
      }),
  postUser: shouldUseMock
    ? mockRequest(
        '/user',
        user => ({
          body: `Registered user: ${user}`,
          ok: true
        }),
        false,
        2000
      )
    : user =>
        fetch('/user', {
          method: 'POST',
          ...jsonRequestBody({
            user
          })
        })
};

export default api;
