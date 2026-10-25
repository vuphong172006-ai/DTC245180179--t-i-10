const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'hrm_db',
  user: process.env.DB_USER || 'hrm_user',
  password: process.env.DB_PASSWORD || 'StrongPassword123!',
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    const dbTime = result.rows[0].now;

    res.send(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hệ thống Quản lý Nhân sự (HRM)</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          body { background: #f0f2f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
          .card { background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); max-width: 650px; width: 100%; border-top: 6px solid #003366; }
          .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 2px solid #eef2f6; padding-bottom: 15px; }
          .header h1 { color: #003366; font-size: 22px; font-weight: 700; }
          .badge { background: #e3f2fd; color: #0d47a1; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
          .status-box { background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 8px; padding: 18px; margin-bottom: 25px; }
          .status-title { color: #2e7d32; font-weight: 700; font-size: 15px; margin-bottom: 6px; display: flex; align-items: center; }
          .status-title::before { content: '●'; margin-right: 8px; font-size: 18px; color: #4caf50; }
          .status-desc { color: #37474f; font-size: 13.5px; word-break: break-all; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .info-label { color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
          .info-value { color: #1e293b; font-size: 14px; font-weight: 600; }
          .footer { margin-top: 25px; text-align: center; color: #94a3b8; font-size: 12.5px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Hệ thống Quản lý Nhân sự (HRM)</h1>
            <span class="badge">Production</span>
          </div>
          <div class="status-box">
            <div class="status-title">Kết nối Cơ sở dữ liệu PostgreSQL Thành công</div>
            <div class="status-desc"><strong>Thời gian thực CSDL:</strong> ${dbTime}</div>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Ứng dụng Backend</div>
              <div class="info-value">Node.js / Express</div>
            </div>
            <div class="info-item">
              <div class="info-label">Cơ sở dữ liệu</div>
              <div class="info-value">PostgreSQL 15</div>
            </div>
            <div class="info-item">
              <div class="info-label">Máy chủ Reverse Proxy</div>
              <div class="info-value">Nginx (HTTPS / TLS)</div>
            </div>
            <div class="info-item">
              <div class="info-label">Bảo mật Hardening</div>
              <div class="info-value">Non-root (UID 1000)</div>
            </div>
          </div>
          <div class="footer">
            Học phần Triển khai & Quản trị Hệ thống Phần mềm - Vũ Ngọc Phong (DTC245180179)
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`<h2>Lỗi kết nối CSDL: ${err.message}</h2>`);
  }
});

app.listen(port, () => {
  console.log(`HRM App listening on port ${port}`);
});
