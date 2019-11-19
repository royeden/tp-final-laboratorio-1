import http.requests.*;
PImage i;
int[] f = {
  GRAY,
  THRESHOLD,
  INVERT,
  BLUR,
  POSTERIZE
};

// change next line
GetRequest getPercentage = new GetRequest("http://192.168.0.7:3000/update");
JSONObject percentageResponse;

int timer = millis();
int percentage = 0;

void requestPercentage () {
  getPercentage.send();
  percentageResponse = parseJSONObject(getPercentage.getContent());
  percentage = percentageResponse.getInt("percentage");
}

void useTimer () {
  int time = millis();
  if (time >= timer + 1000) {
    timer = time;
    requestPercentage();
  }
}

void useFilter() {
  int appliedFilter = floor(map(percentage, 0, 100, 0, 4));
  if (f[appliedFilter] == POSTERIZE) {
    filter(f[appliedFilter], random(2, 15));
  } else {
    filter(f[appliedFilter]);
  }
}

void setup() {
  fullScreen(2);
  i = loadImage("download.jpg");
}

void draw() {
  useTimer();
  image(i, 0, 0, width, height);
  pushMatrix();
    useFilter();
  popMatrix();
}


// import processing.video.*;
// String PREFIX_AFEITARSE = "afeitarse_";
// Movie []VIDEOS_AFEITARSE = new Movie[2];
// String EXTENSION = ".MOV";

// int counter = millis();
// int VIDEO = round(random(0, 1));
// int RETRY = 3;
// float SHORT_VIDEO;

// void setup() {
//   fullScreen();
//   for (int i = 0; i < 2; i++) {
//     Movie video = new Movie(this, PREFIX_AFEITARSE + (i + 1) + EXTENSION);
//     video.frameRate(24);
//     video.play();
//     video.noLoop();
//     if (i == 0) {
//       SHORT_VIDEO = video.duration();
//     } else {
//       SHORT_VIDEO = min(SHORT_VIDEO, video.duration());
//     }
//     VIDEOS_AFEITARSE[i] = video;
//   }
//   frameRate(24);
//   tint(255, 126);
//   background(0);
// }

// void draw() {
//   for (int i = 0; i < 2; i++) {
//     image(VIDEOS_AFEITARSE[i], 0, 0, width, height);
//   }
//   image(VIDEOS_AFEITARSE[VIDEO], 0, 0, width, height);
//   if (millis() - counter >= 500) {
//     VIDEO = round(random(0, 1));
//     counter = millis();
//     RETRY--;
//     if (RETRY == 0) {
//       RETRY = 3;
//       if (VIDEO == 0) {
//         VIDEO  = 1;
//       } else {
//         VIDEO = 0;
//       }
//     }
//   }
//   if (second() >= SHORT_VIDEO) {
//     exit();
//   }
//   saveFrame("./video/########.tif");
// }

// void movieEvent(Movie m) {
//   m.read();
// }
