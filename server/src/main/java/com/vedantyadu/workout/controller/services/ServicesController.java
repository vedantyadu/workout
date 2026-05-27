package com.vedantyadu.workout.controller.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.service.GooglePlacesService;

@RestController
@RequestMapping("/services")
public class ServicesController {

  private GooglePlacesService googlePlacesService;

  public ServicesController(GooglePlacesService googlePlacesService) {
    this.googlePlacesService = googlePlacesService;
  }

  @PostMapping("/search-location")
  public ResponseEntity<String> searchLocation(@RequestBody SearchLocationRequestDTO body) {
    try {
      return ResponseEntity.status(HttpStatus.OK).body(googlePlacesService.searchLocation(body.getQuery()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
    }
  }
}

class SearchLocationRequestDTO {
  private String query;

  public SearchLocationRequestDTO(String query) {
    this.query = query;
  }

  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }
}
