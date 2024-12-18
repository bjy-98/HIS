package kroryi.his.websocket;

import kroryi.his.domain.PatientAdmission;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class PatientAdmissionEvent extends ApplicationEvent {
    private final Integer patientId;

    public PatientAdmissionEvent(Object source, Integer patientId) {
        super(source);
        this.patientId = patientId;
    }

}