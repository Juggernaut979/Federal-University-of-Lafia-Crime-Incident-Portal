package ng.edu.fulafia.security.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident_reports")
public class IncidentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_id", unique = true, nullable = false, length = 30)
    private String trackingId; // e.g. FUL-2025-0482

    @Column(name = "incident_type", nullable = false, length = 100)
    private String incidentType;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String narrative;

    @Column(name = "location_name", nullable = false, length = 200)
    private String locationName;

    @Column(name = "campus_sector", nullable = false, length = 50)
    private String campusSector;

    @Column(name = "gps_coordinates", length = 100)
    private String gpsCoordinates;

    @Column(name = "priority_level", nullable = false, length = 20)
    private String priorityLevel;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "is_anonymous")
    private Boolean isAnonymous;

    @Column(name = "reporter_name_override")
    private String reporterNameOverride;

    @Column(name = "reporter_matric_override")
    private String reporterMatricOverride;

    @Column(name = "verification_pin", length = 20)
    private String verificationPin;

    @Column(name = "assigned_lead_name")
    private String assignedLeadName;

    @Column(name = "assigned_patrol_team")
    private String assignedPatrolTeam;

    @Column(name = "officer_investigation_remarks", columnDefinition = "TEXT")
    private String officerInvestigationRemarks;

    @Column(name = "reported_at")
    private LocalDateTime reportedAt;

    public IncidentReport() {
        this.reportedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

    public String getIncidentType() { return incidentType; }
    public void setIncidentType(String incidentType) { this.incidentType = incidentType; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getNarrative() { return narrative; }
    public void setNarrative(String narrative) { this.narrative = narrative; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public String getCampusSector() { return campusSector; }
    public void setCampusSector(String campusSector) { this.campusSector = campusSector; }

    public String getGpsCoordinates() { return gpsCoordinates; }
    public void setGpsCoordinates(String gpsCoordinates) { this.gpsCoordinates = gpsCoordinates; }

    public String getPriorityLevel() { return priorityLevel; }
    public void setPriorityLevel(String priorityLevel) { this.priorityLevel = priorityLevel; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getIsAnonymous() { return isAnonymous; }
    public void setIsAnonymous(Boolean anonymous) { isAnonymous = anonymous; }

    public String getReporterNameOverride() { return reporterNameOverride; }
    public void setReporterNameOverride(String reporterNameOverride) { this.reporterNameOverride = reporterNameOverride; }

    public String getReporterMatricOverride() { return reporterMatricOverride; }
    public void setReporterMatricOverride(String reporterMatricOverride) { this.reporterMatricOverride = reporterMatricOverride; }

    public String getVerificationPin() { return verificationPin; }
    public void setVerificationPin(String verificationPin) { this.verificationPin = verificationPin; }

    public String getAssignedLeadName() { return assignedLeadName; }
    public void setAssignedLeadName(String assignedLeadName) { this.assignedLeadName = assignedLeadName; }

    public String getAssignedPatrolTeam() { return assignedPatrolTeam; }
    public void setAssignedPatrolTeam(String assignedPatrolTeam) { this.assignedPatrolTeam = assignedPatrolTeam; }

    public String getOfficerInvestigationRemarks() { return officerInvestigationRemarks; }
    public void setOfficerInvestigationRemarks(String remarks) { this.officerInvestigationRemarks = remarks; }

    public LocalDateTime getReportedAt() { return reportedAt; }
    public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }
}
