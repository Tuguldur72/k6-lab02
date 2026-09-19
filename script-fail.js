import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    'http_req_duration': ['p(95)<50'], //!Fail
    'http_req_failed': ['rate<0.01'],
  },
  vus: 5,
  duration: '1m',
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status 200 байна': (r) => r.status === 200,
  });
  sleep(1);
}