package com.vedantyadu.workout.controller.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vedantyadu.workout.db.Activities;
import com.vedantyadu.workout.repository.ActivitiesRepository;
import com.vedantyadu.workout.repository.UsersRepository;
import com.vedantyadu.workout.service.GooglePlacesService;

@RestController
@RequestMapping("/services")
public class ServicesController {

  private GooglePlacesService googlePlacesService;
  private ActivitiesRepository activitiesRepository;
  private UsersRepository usersRepository;

  public ServicesController(GooglePlacesService googlePlacesService, ActivitiesRepository activitiesRepository,
      UsersRepository usersRepository) {
    this.googlePlacesService = googlePlacesService;
    this.activitiesRepository = activitiesRepository;
    this.usersRepository = usersRepository;
  }

  @PostMapping("/search-location")
  public ResponseEntity<String> searchLocation(@RequestBody SearchLocationRequestDTO body) {
    try {
      return ResponseEntity.status(HttpStatus.OK).body(googlePlacesService.searchLocation(body.getQuery()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
    }
  }

  @GetMapping("/activities")
  public ResponseEntity<?> getActivities() {
    try {
      List<Activities> activities = activitiesRepository.findAllByActive(true);
      return ResponseEntity.status(HttpStatus.OK).body(activities);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
    }
  }

  @PostMapping("/username-exists")
  public ResponseEntity<?> checkUsernameExists(@RequestBody String username) {
    try {
      if (usersRepository.findByUsername(username).isPresent()) {
        return ResponseEntity.status(HttpStatus.OK).body(true);
      }
      return ResponseEntity.status(HttpStatus.OK).body(false);
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
