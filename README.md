# iotnhom5

[DEMO:](https://nhom5iottest.firebaseapp.com)

![alt text](https://image.ibb.co/hjNH5o/screencapture_nhom5iottest_firebaseapp_1526706723223.png "Demo")


Edit your API in iot-19-5-2018.ino

```bash
const char* host = "YOUR_API";
String ssid = "YOUR_NAME_WIFI";
String pass = "YOUR_WIFI_PASSWORD";
String url = "YOUR_URL_API";
```
Edit your API in server

config your serverless key in 
https://serverless.com/framework/docs/providers/aws/guide/credentials/

```bash
npm install -g serverless
cd server
sls deploy 
```

Edit your API in app

In app/src/Pages/Demos/ReactGoogleMaps.jsx
```bash
axios.get("YOUR_API_URL")
googleMapURL:"https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAP_API&v=3.exp&libraries=geometry,drawing,places"
```
