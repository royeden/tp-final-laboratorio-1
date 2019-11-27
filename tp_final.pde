import http.requests.*;
import processing.video.*;

Movie video;
PImage img;
boolean adChance = false;
int adSecond;

GetRequest getTime = new GetRequest("http://192.168.0.7:3000/time");
GetRequest getPercentage = new GetRequest("http://192.168.0.7:3000/update");

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
    timeResponse = handleGetRequest(getTime);
    // When time is null it breaks
    if (!timeResponse.isNull("time")) {
      time = timeResponse.getInt("time") / 1000;
    } else time = 0;
    percentage = percentageResponse.getInt("percentage");
  }
}

float mapPercentage(int low, int high) {
  return round(map(percentage, 0, 100, low, high));
}

boolean chance(int low, int high, float chancePercentage) {
  return round(random(low, high)) <= chancePercentage;
}

boolean isSameSecond(int prevSecond) {
  return prevSecond == second();
}

void ad() {
  image(img, width / 2, height / 2);
}

void setup() {
  background(0);
  // background(255);
  // fullScreen(2);
  frameRate(24);
  fullScreen();
  textAlign(CENTER);
  imageMode(CENTER);
  textSize(100);
  img = loadImage("1.png");
  img.resize(0, height);
  video = new Movie(this, "afeitarse_2.MOV");
  video.frameRate(24);
  video.loop();
}

void draw() {
  updateRequests();
  tint(255, mapPercentage(255, 0), mapPercentage(255, 0));
  if (time > 0) {
    PImage frame = video;
    frame.resize(0, height);
    image(frame, width / 2, height / 2);
    if (adChance) {
      adChance = isSameSecond(adSecond);
    } else {
      adChance = chance(0, 100, mapPercentage(0, 2));
      if (adChance) {
        adSecond = second();
      }
    }
    if (adChance) ad();
  }
  filter(POSTERIZE, round(random(mapPercentage(59, 2), 60)));
  if (chance(0, 100, mapPercentage(0, 10))) filter(BLUR, round(random(0, 1)));
  if (chance(0, 100, mapPercentage(0, 10))) filter(DILATE);
  text(time, width / 2, height / 2);
  text(percentage, width / 2, height / 2 + 100);
}

void movieEvent(Movie m) {
  m.read();
}
