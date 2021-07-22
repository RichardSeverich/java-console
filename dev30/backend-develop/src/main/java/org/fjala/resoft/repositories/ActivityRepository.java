package org.fjala.resoft.repositories;

import java.util.Collection;
import java.util.Optional;
import org.fjala.resoft.datatypes.Activity;
import org.fjala.resoft.datatypes.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity findByNameAndStage(String name, Stage stage);

    Collection<Activity> findAllByStageOrderByDateAsc(Stage stage);

    Collection<Activity> findAllByStageIdOrderByDateAsc(Long id);

    Optional<Activity> findByName(String name);
}
