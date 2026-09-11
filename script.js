import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // 30 сек-ийн дотор 0-ээс 20 VU болгож өсгөнө
    { duration: '1m', target: 20 },  // 1 мин-ийн турш 20 VU тогтвортой барина
    { duration: '30s', target: 0 },  // 30 сек-ийн дотор 20-оос 0 VU болгож бууруулна
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  
  check(res, {
    'status 200 байна': (r) => r.status === 200,
  });

  sleep(1);
}