import http.requests.*;
PImage img;

int[] f = {
  GRAY,
  THRESHOLD,
  INVERT,
  BLUR,
  POSTERIZE
};

// SUBIMAGES (BROKEN)
// int maxXChange = 125;
// int maxYChange = 5;
// float yNoiseChange = 0.01;
// float timeNoiseChange = 0.013;

// change next line
GetRequest getPercentage = new GetRequest("192.168.1.128:3000/update");
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
  useTimer();
  image(img, 0, 0, width, height);
  pushMatrix();
    int appliedFilter = floor(map(percentage, 0, 100, 0, 4));
    if (f[appliedFilter] == POSTERIZE) {
      filter(f[appliedFilter], random(2, 15));
    } else {
      filter(f[appliedFilter]);
    }
  popMatrix();
}

// SUBIMAGES (BROKEN)
// void drawStreak() {
//   float y = floor(random(height));
// 	float h = floor(random(20, 30));
// 	float xChange = floor(map(noise(y * yNoiseChange, (mouseY * 0.3 + frameCount) * timeNoiseChange), 0.06, 0.94, -maxXChange, maxXChange)); //floor(random(-maxXChange, maxXChange));
// 	float yChange = floor(xChange * (maxYChange / maxXChange) * random(0, 1) > 0.1 ? -1 : 1);
//   image(img, xChange - maxXChange, -maxYChange + y + yChange, img.width, h, 0, round(y), round(img.width), round(h));
// }

void setup() {
  background(255);
  // fullScreen(2);
  fullScreen();
  img = loadImage("download.jpg");
  imageMode(CENTER);
  image(img, width / 2, height / 2);
}

void draw() {
  useFilter();
  // pushMatrix();
  //   translate(width / 2, 0);
  //   for (int i = 0; i < img.height / 60; i++) {
  //     drawStreak();
  //   }
  // popMatrix();
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
