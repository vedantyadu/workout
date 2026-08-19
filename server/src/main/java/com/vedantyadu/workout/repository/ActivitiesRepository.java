package com.vedantyadu.workout.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vedantyadu.workout.db.Activities;

@Repository
public interface ActivitiesRepository extends JpaRepository<Activities, UUID> {
  List<Activities> findAllByActive(boolean active);
}
