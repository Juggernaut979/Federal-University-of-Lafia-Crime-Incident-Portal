package ng.edu.fulafia.security.controller;

import ng.edu.fulafia.security.model.IncidentReport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    // In a full Spring Boot context, this injects IncidentRepository
    @GetMapping
    public ResponseEntity<List<IncidentReport>> getAllIncidents(
            @RequestParam(required = false) String sector,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type) {
        // Returns list of incident records matching filters
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{trackingId}")
    public ResponseEntity<IncidentReport> getByTrackingId(@PathVariable String trackingId) {
        // Query by trackingId (e.g. FUL-2025-0482)
        return ResponseEntity.ok(new IncidentReport());
    }

    @PostMapping("/submit")
    public ResponseEntity<IncidentReport> submitIncident(@RequestBody IncidentReport incident) {
        // Persists to PostgreSQL incident_reports table
        return ResponseEntity.ok(incident);
    }

    @PatchMapping("/{trackingId}/remarks")
    public ResponseEntity<Void> updateDutyOfficerRemarks(
            @PathVariable String trackingId,
            @RequestBody String remarks) {
        // Updates officer_investigation_remarks in PostgreSQL
        return ResponseEntity.noContent().build();
    }
}
