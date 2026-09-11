import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 30,
  duration: '1m',
  thresholds: {
    // Нийт хүсэлтийн 95% нь 500ms-ээс хурдан байх ёстой
    'http_req_duration': ['p(95)<500'],
    // Алдааны хувь 1%-иас бага байх ёстой
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  
  // Status 200 эсэхийг шалгах Check
  check(res, {
    'status 200 байна': (r) => r.status === 200,
  });

  sleep(1);
}