import http.requests.*;

// change next line
GetRequest getPercentage = new GetRequest("http://192.168.0.7:3000");
JSONObject percentageResponse;

int timer = millis();
int percentage = 0;

void requestPercentage () {
  getPercentage.send();
  percentageResponse = parseJSONObject(getPercentage.getContent());
  percentage = percentageResponse.getInt("percentage");
}

void setup() {
  fullScreen();
}

void draw() {
  
}
