import http.requests.*;
import processing.video.*;

String VIDEO_EXTENSION = ".mp4";
String IMAGE_EXTENSION = ".png";

int prevIndex = 1;
int prevSecond;

String [] AD_PREFIX = {
  "Soft_",
  "Asco_",
  "Hardcore_"
};

int SOFT_VIDEO_AMOUNT = 4; // 30
int ASCO_VIDEO_AMOUNT = 4; // 13
int HARDCORE_VIDEO_AMOUNT = 2;

Movie [] SOFT_VIDEOS = new Movie[SOFT_VIDEO_AMOUNT];
Movie [] ASCO_VIDEOS = new Movie[ASCO_VIDEO_AMOUNT];
Movie [] HARDCORE_VIDEOS = new Movie[HARDCORE_VIDEO_AMOUNT];

// String NOSOTRXS = "Nosotrx/";

// String [] NOSOTRXS_CATEGORIES = {
//   "afeitarse fati/",
//   "afeitarse roy/",
//   "maquillarse/"
// };

// int AFEITARSE_VIDEO_AMOUNT = 2;
// int MAQUILLARSE_VIDEO_AMOUNT = 2;

// Movie [] AFEITARSE_FATI_VIDEOS = new Movie[AFEITARSE_VIDEO_AMOUNT];
// Movie [] AFEITARSE_ROY_VIDEOS = new Movie[AFEITARSE_VIDEO_AMOUNT];
// Movie [] MAQUILLARSE_VIDEOS = new Movie[MAQUILLARSE_VIDEO_AMOUNT];


// String AD_IMAGE_DIR = "img/";
String AD_VIDEO_PREFIX = "video_";

int [] AD_RANGES = {
  0,
  90
  // implicit 100%
};

// Ads
int ADS_LENGTH = 12;
PImage ads[] = new PImage[ADS_LENGTH];
int adIndex = floor(random(0, ADS_LENGTH));
boolean adChance = false;

int adSecond;
int thresholdSecond;

GetRequest getTime = new GetRequest("http://192.168.1.104:3000/time");
GetRequest getPercentage = new GetRequest("http://192.168.1.104:3000/percentage");

JSONObject timeResponse;
JSONObject percentageResponse;

int timer = millis();

int time = 0;
int percentage = 0;
boolean started = false;

JSONObject handleGetRequest(GetRequest request) {
  request.send();
  return parseJSONObject(request.getContent());
}

void updateRequests() {
  int ellapsed = millis();
  if (ellapsed >= timer + 1000) {
    timer = ellapsed;
    percentageResponse = handleGetRequest(getPercentage);
    percentage = percentageResponse.getInt("percentage");
    started = percentageResponse.getBoolean("started");
    timeResponse = handleGetRequest(getTime);
    time = timeResponse.getInt("time") / 1000;
  }
}

int adIndex() {
  if (percentage <= AD_RANGES[0]) return 0;
  else if (percentage <= AD_RANGES[1]) return 1;
  else return 2;
}

float mapPercentage(int low, int high) {
  return round(map(percentage, -100, 100, low, high));
}

// void compositeFrame(Movie videos[]) {
//   int first = 0;
//   int second = 1;
//   if (chance(0, 100, 50)) {
//     first = 1;
//     second = 0;
//   }
//   tint(255, mapPercentage(255, 0), mapPercentage(255, 0), mapPercentage(128, 64));
//   PImage frame1 = videos[first];
//   PImage frame2 = videos[second];
//   frame1.resize(0, height);
//   frame2.resize(0, height);
//   image(frame1, width / 2, height / 2);
//   image(frame2, width / 2, height / 2);
// }

void finish() {
  text("Porcentaje final: " + percentage + "%", width / 2, height / 2);
}

void loadMovies (Movie [] arr, String dir, int amount, boolean sync) {
  for (int i = 0; i < amount; i++) {
    arr[i] = new Movie(this, dir + (i + 1) + VIDEO_EXTENSION);
    arr[i].volume(0);
    arr[i].frameRate(24);
    // arr[i].loop();
  }
  if (sync) {
    Movie tmp = arr[0];
    for (int i = 1; i < amount; i++) {
      arr[i].jump(tmp.time() + 0.1 * i);
    }
  }
}

void play(Movie [] arr, int amount) {
  for (int i = 0; i < amount; i++) {
    arr[i].loop();
  }
}
void stop(Movie [] arr, int amount) {
  for (int i = 0; i < amount; i++) {
    arr[i].pause();
  }
}

void setup() {
  background(0);
  fullScreen(2);
  frameRate(24);
  // fullScreen();
  textAlign(CENTER);
  imageMode(CENTER);
  textSize(100);
  
  prevSecond = second();

  loadMovies(SOFT_VIDEOS, AD_PREFIX[0] + AD_VIDEO_PREFIX, SOFT_VIDEO_AMOUNT, false);
  loadMovies(ASCO_VIDEOS, AD_PREFIX[1] + AD_VIDEO_PREFIX, ASCO_VIDEO_AMOUNT, false);
  loadMovies(HARDCORE_VIDEOS, AD_PREFIX[2] + AD_VIDEO_PREFIX, HARDCORE_VIDEO_AMOUNT, false);
  // for (int i = 0; i < ADS_LENGTH; i++) {
  //   ads[i] = loadImage(i + 1 + ".png");
  //   ads[i].resize(0, height);
  // }
  
  // for (int i = 0; i < 2; i++) {
  //   // afeitarse_roy[i].volume(0);
  //   afeitarse_fati[i].volume(0);
  //   // afeitarse_roy[i].loop();
  //   afeitarse_fati[i].loop();
  // }
}

void draw() {
  updateRequests();
  
  if (!started) {
    if (time == 0) {
      clear();
      finish();
    }
  } else {
    PImage frame;
    int index = adIndex();
    if (index == 0) {
      if (index != prevIndex) {
        prevIndex = index;
        stop(ASCO_VIDEOS, ASCO_VIDEO_AMOUNT);
        play(SOFT_VIDEOS, SOFT_VIDEO_AMOUNT);
      }
      float mappedColor = mapPercentage(0, 255);
      tint(mappedColor, mappedColor, 255, mapPercentage(255, 128));
      frame = SOFT_VIDEOS[floor(random(SOFT_VIDEO_AMOUNT))];
    } else if (index == 1) {
      if (index != prevIndex) {
        if (prevIndex == 0) stop(SOFT_VIDEOS, SOFT_VIDEO_AMOUNT);
        else stop(HARDCORE_VIDEOS, HARDCORE_VIDEO_AMOUNT);
        prevIndex = index;
        play(ASCO_VIDEOS, ASCO_VIDEO_AMOUNT);
      }
      tint(255, 255, 255, 128);
      frame = ASCO_VIDEOS[floor(random(ASCO_VIDEO_AMOUNT))];
    } else {
      if (index != prevIndex) {
        prevIndex = index;
        stop(ASCO_VIDEOS, ASCO_VIDEO_AMOUNT);
        play(HARDCORE_VIDEOS, HARDCORE_VIDEO_AMOUNT);
      }
      float mappedColor = mapPercentage(255, 0);
      tint(255, mappedColor, mappedColor, mapPercentage(128, 255));
      frame = HARDCORE_VIDEOS[floor(random(2))];
    }
    if (prevSecond != second()) {
      clear();
      prevSecond = second();
    }
    frame.resize(width, height);
    image(frame, width / 2, height / 2);
  }
}

void movieEvent(Movie m) {
  m.read();
}
