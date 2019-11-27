

class GlitchObject {
  PImage glitchedImages[];
  int [][][] glitches;
  int w, h, a;
  GlitchObject (int amount, int tmpW, int tmpH) {
    glitches = new int[amount][tmpW][tmpH];
    glitchedImages = new PImage[amount];
    a = amount;
    w = tmpW;
    h = tmpH;
    // for ()
    println("Glitch ready: " + "width " + w + " " + "height " + h +"!");
  }
 
  void run() {
    // loadPixels();
  }
 
}
