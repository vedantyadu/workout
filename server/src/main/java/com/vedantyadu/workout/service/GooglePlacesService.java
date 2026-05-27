package com.vedantyadu.workout.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class GooglePlacesService {

  @Value("${google.places.apiKey}")
  private String placesAPIKey;

  public String searchLocation(String query) throws Exception {
    String url = "https://places.googleapis.com/v1/places:autocomplete";

    ObjectMapper mapper = new ObjectMapper();
    ObjectNode bodyNode = mapper.createObjectNode();
    bodyNode.put("input", query);
    String body = mapper.writeValueAsString(bodyNode);

    System.out.println(body);

    HttpClient client = HttpClient.newBuilder()
        .build();

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("Content-Type", "application/json")
        // .header("X-Goog-FieldMask",
        // "places.name,places.formattedAddress,places.location")
        .header("X-Goog-Api-Key", placesAPIKey)
        .POST(BodyPublishers.ofString(body))
        .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    return response.body();
  }
}
