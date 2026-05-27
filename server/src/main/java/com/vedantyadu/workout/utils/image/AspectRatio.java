package com.vedantyadu.workout.utils.image;

public class AspectRatio {
  private float vertical;
  private float horizontal;

  public AspectRatio(float horizontal, float vertical) {
    this.vertical = vertical;
    this.horizontal = horizontal;
  }

  public float getHorizontal() {
    return horizontal;
  }

  public float getVertical() {
    return vertical;
  }
}
