# Hướng dẫn Triển khai Ứng dụng Nhà của Yến Sào

## 1. Yêu cầu Hệ thống

- Node.js phiên bản 19.0.0 trở lên
- npm phiên bản 9.0.0 trở lên
- Trình duyệt hiện đại hỗ trợ PWA

## 2. Công nghệ Sử dụng

- React 19.0.0
- Vite
- TailwindCSS 4.0.16
- Ant Design (antd)
- Redux Toolkit + Redux Persist
- React Router DOM
- PWA (Progressive Web App)

## 3. Cấu trúc Thư mục

```
src/
  ├── apis/         # API calls và services
  ├── assets/       # Static assets (images, fonts)
  ├── components/   # Reusable components
  ├── configs/      # Configuration files
  ├── constants/    # Constants and enums
  ├── features/     # Redux slices
  ├── layouts/      # Layout components
  ├── pages/        # Page components
  ├── routes/       # Route definitions
  ├── utils/        # Utility functions
  ├── App.jsx      # Root component
  ├── main.jsx     # Entry point
  └── store.js     # Redux store configuration
```

## 4. Các Bước Cài Đặt

1. Clone repository:

```sh
git clone <repository-url>
cd web-app-nhacuayensao
```

2. Cài đặt dependencies:

```sh
npm install
```

3. Tạo file môi trường `.env`:

```
VITE_API_NCYS=https://localapipnhacuayensao.com:3001/api/v1
VITE_PRIVATE_KEY_SDK=ab9f9111f3d35b2f0381c0711ef4b418
VITE_CANCEL_URL_PAY_OS=http://localhost:5173/
VITE_RETURN_URL_PAY_OS=http://localhost:5173/deposit-success
VITE_CHECKSUM_KEY=891d8af2982f0c916aea3966774a611062404a1085eccf71dbd42d9e260596de
```

4. Chạy ứng dụng ở môi trường development:

```sh
npm run dev
```

## 5. Tính năng PWA

Ứng dụng được cấu hình như một Progressive Web App (PWA) với:

- Service Worker để caching và offline support
- Manifest file cho cài đặt trên thiết bị
- Icons và splash screens

## 6. Xác thực và Bảo mật

- JWT authentication với access token và refresh token
- KYC (Know Your Customer) verification
- Mã hóa dữ liệu nhạy cảm

## 7. Các Tính năng Chính

- Đăng ký/Đăng nhập người dùng
- Xác thực KYC
- Quản lý ví điện tử
- Đầu tư dự án
- Rút tiền/Nạp tiền
- Quản lý voucher

## 8. Build và Triển khai

1. Build ứng dụng:

```sh
npm run build
```

2. Preview bản build:

```sh
npm run preview
```

3. Các file build sẽ được tạo trong thư mục `dist/`

## 9. Quy trình Phát triển

1. Sử dụng ESLint cho code formatting
2. Tuân thủ cấu trúc thư mục đã định
3. Commit message format: `type(scope): message`
4. Test kỹ các tính năng liên quan đến giao dịch

## 10. Môi trường

- Development: `localhost:5173`
- API Base URL: `https://localapipnhacuayensao.com:3001/api/v1`

## 11. Tài liệu API

API documentation có thể được truy cập tại file `apis/` directory.

## 12. Vấn đề Thường gặp

1. CORS issues: Kiểm tra cấu hình CORS trong file `vite.config.js`
2. PWA không update: Xóa cache và unregister service worker
3. Build fails: Kiểm tra Node version và dependencies

## 13. Hỗ trợ

Liên hệ: contact@nhacuayensao.com
