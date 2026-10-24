# Đề 10: Hệ thống Quản lý Nhân sự (HRM)
Môn: Triển khai và Quản trị Hệ thống Phần mềm

## Cấu trúc hệ thống
- **Ứng dụng HRM**: Node.js/Express kết nối PostgreSQL[cite: 1].
- **Quản lý Database**: pgAdmin[cite: 1].
- **Reverse Proxy**: Nginx (hỗ trợ HTTPS và Security Headers).
- **Giám sát**: Prometheus + Grafana + cAdvisor.
- **Log tập trung**: Loki + Promtail[cite: 2].

## Hướng dẫn chạy hệ thống
1. Khởi chạy toàn bộ dịch vụ bằng Docker Compose[cite: 2]:
   ```bash
   sudo docker compose up -d --build



