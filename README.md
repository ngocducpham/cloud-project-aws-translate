# AWS Translate Demo
_Đồ án kết thúc môn học cloud computing_

## Cài đặt

Đảm bảo máy đã cài trước [Node.js](https://nodejs.org/en/)

Vào terminal để cài đặt các dependencies

``` bash
$ npm install
````

### Nhập access key và sercet key 
Vào file `/src/script.js` và nhập key của bạn
```javascript
AWS.config.credentials = new AWS.Credentials(
	'your access key',
	'your secret key'
);
```


## Chạy Project

```bash
$ npm run dev
```

## License
Copyright (c) 2021 Pham Ngoc Duc