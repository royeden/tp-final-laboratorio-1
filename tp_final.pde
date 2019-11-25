import http.requests.*;

GetRequest getTime = new GetRequest("http://192.168.43.171:3000/time");
GetRequest getPercentage = new GetRequest("http://192.168.43.171:3000/update");

JSONObject timeResponse;
JSONObject percentageResponse;

int timer = millis();
int time = 0;
int percentage = 0;

JSONObject handleGetRequest(GetRequest request) {
  request.send();
  return parseJSONObject(request.getContent());
}

void updateRequests() {
  int ellapsed = millis();
  if (ellapsed >= timer + 1000) {
    timer = ellapsed;
    percentageResponse = handleGetRequest(getPercentage);
    println(percentageResponse);
    percentage = percentageResponse.getInt("percentage");
  }
}

void setup() {
  background(0);
  // background(255);
  // fullScreen(2);
  fullScreen();
  textAlign(CENTER);
  textSize(100);
}

void draw() {
  updateRequests();
  text(percentage, width / 2, height / 2); 
}
