package com.vedantyadu.workout.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class RazorpayService {

  private RazorpayClient razorpayClient;

  public RazorpayService(
      @Value("${razorpay.key.id}") String razorpayKeyId,
      @Value("${razorpay.key.secret}") String razorpayKeySecret) throws RazorpayException {
    this.razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
  }

  public String createOrder(String amount) {
    try {
      JSONObject orderRequest = new JSONObject();
      orderRequest.put("amount", amount);
      orderRequest.put("currency", "INR");
      orderRequest.put("payment_capture", "1");
      Order order = razorpayClient.orders.create(orderRequest);
      return order.get("id");
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
