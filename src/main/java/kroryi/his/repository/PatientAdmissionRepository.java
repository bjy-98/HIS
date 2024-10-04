package kroryi.his.repository;

import kroryi.his.domain.PatientAdmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientAdmissionRepository extends JpaRepository<PatientAdmission, Integer> {
    List<PatientAdmission> findByTreatStatus(String treatStatus);
}
