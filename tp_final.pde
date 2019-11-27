import http.requests.*;
import processing.video.*;

GlitchObject noiseGlitch;
Movie video;

// Ads
int ADS_LENGTH = 12;
PImage ads[] = new PImage[ADS_LENGTH];
int adIndex = floor(random(0, ADS_LENGTH));
boolean adChance = false;
// boolean glitch = true;
int adSecond;
int thresholdSecond;

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
  if (adChance) {
    adChance = isSameSecond(adSecond);
  } else {
    adChance = chance(0, 100, mapPercentage(0, 2));
    if (adChance) {
      adSecond = second();
      adIndex = floor(random(0, ADS_LENGTH));
    }
  }
  if (adChance) {
    tint(255, mapPercentage(255, 0), mapPercentage(255, 0));
    image(ads[adIndex], width / 2, height / 2);
  }
}

void setup() {
  background(0);
  // fullScreen(2);
  frameRate(24);
  fullScreen();
  textAlign(CENTER);
  imageMode(CENTER);
  textSize(100);
  for (int i = 0; i < ADS_LENGTH; i++) {
    ads[i] = loadImage(i + 1 + ".png");
    ads[i].resize(0, height);
  }
  video = new Movie(this, "afeitarse_fati_traje.mp4");
  // video.frameRate(24);
  video.volume(0);
  video.loop();
  noiseGlitch = new GlitchObject(10, width, height);
}

void draw() {
  updateRequests();
  if (chance(0, 100, mapPercentage(0, 1)) || isSameSecond(thresholdSecond)) {
    if (!isSameSecond(thresholdSecond)) {
      thresholdSecond = second();
    }
    filter(THRESHOLD);
  } else {
    thresholdSecond = -1;
  }
  tint(255, mapPercentage(255, 0), mapPercentage(255, 0), mapPercentage(255, 128));
  if (time > 0) {
    PImage frame = video;
    frame.resize(0, height);
    image(frame, width / 2, height / 2);
    ad();
    filter(POSTERIZE, round(random(mapPercentage(59, 2), 60)));
    if (chance(0, 100, mapPercentage(0, 10))) filter(BLUR, round(random(0, 1)));
    if (chance(0, 100, mapPercentage(0, 10))) filter(DILATE);
  } else {
    clear();
  }
  text(time, width / 2, height / 2);
  text(percentage, width / 2, height / 2 + 100);
}

void movieEvent(Movie m) {
  m.read();
}
