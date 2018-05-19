#ifdef ESP8266
extern "C" {
#include "user_interface.h"
}
#endif

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

ADC_MODE(ADC_VCC);

WiFiClientSecure client;

const char* host = "YOUR_API";
String ssid = "YOUR_NAME_WIFI";
String pass = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  wifiConnection();
}

void loop() {
    String url = "YOUR_URL_API";
    String dataLocation = "{ \"lat\": \"10.850" + String(rand() % 10) + "82\", \"lng\": \"106.771" + String(rand() % 10) + "53\" }";
    Serial.println("POST to https://" + String(host) + url);
    Serial.println("Data: " + String(dataLocation));
    Serial.print("Result(response): ");
    Serial.println(httpsPost(url, dataLocation));
    delay(10000); //delay 10s
}

boolean wifiConnection() {
  WiFi.begin(ssid.c_str(), pass.c_str());
  int count = 0;
  Serial.print("Waiting for Wi-Fi connection");
  while ( count < 20 ) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println();
      Serial.println("Connected!");
      return (true);
    }
    delay(500);
    Serial.print(".");
    count++;
  }
  Serial.println("Timed out.");
  return false;
}

String httpsPost(String url, String data) {
  if (client.connect(host, 443)) {
    client.println("POST " + url + " HTTP/1.1");
    client.println("Host: " + (String)host);
    client.println("User-Agent: ESP8266/1.0");
    client.println("Connection: close");
    client.println("Content-Type: application/text;");
    client.print("Content-Length: ");
    client.println(data.length());
    client.println();
    client.println(data);
    delay(10);
    String response = client.readString();
    int bodypos =  response.indexOf("\r\n\r\n") + 4;
    return response.substring(bodypos);
  }
  else {
    return "ERROR";
  }
}

