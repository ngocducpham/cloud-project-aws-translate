# AWS Translate Demo
_Đồ án kết thúc môn học cloud computing_

## Cài đặt

Đảm bảo máy đã cài trước [Node.js](https://nodejs.org/en/)

Vào terminal để cài đặt các dependencies

``` bash
$ npm install
````

### Thay đổi access key và sercet key 
Vào file `/src/script.js` sẽ thấy dòng dưới đây. Thay `your-access-key` và `your-secret-key` bằng key của bạn
```javascript
AWS.config.credentials = new AWS.Credentials(
	'your-access-key',
	'your-secret-key'
);
```
Nếu bạn chưa biết cách lấy key? Tham khảo [AWS IAM](https://aws.amazon.com/vi/iam/)

## Chạy project

```bash
$ npm run dev
or
$ npm run preview
```

## Build project

```bash
$ npm run build
```

## License
Copyright (c) 2021 Pham Ngoc Duc