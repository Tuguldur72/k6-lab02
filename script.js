import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    'http_req_duration': ['p(95)<529'], // Baseline p95 (352.58ms) * 1.5 ≈ 529ms
    'http_req_failed': ['rate<0.01'],
  },
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 30 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status 200 байна': (r) => r.status === 200,
  });
  sleep(1);
}