import React, { useState } from 'react';

export const DatabaseSchemaModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('sql');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-surface-container-lowest border-2 border-primary/40 max-w-4xl w-full rounded-2xl shadow-2xl my-6 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-inverse-surface text-inverse-on-surface flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-fixed text-2xl">database</span>
            <div>
              <h3 className="font-bold text-title-md">Relational Database Architecture (PostgreSQL)</h3>
              <p className="text-body-sm text-surface-variant">
                Federal University of Lafia Security Research Specification • Spring Boot + PostgreSQL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 font-bold text-label-md border-b-2 transition-all ${
              activeTab === 'sql'
                ? 'border-primary text-primary bg-surface-container-lowest rounded-t-lg'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            PostgreSQL DDL Schema (3 Tables)
          </button>
          <button
            onClick={() => setActiveTab('spring')}
            className={`px-4 py-2 font-bold text-label-md border-b-2 transition-all ${
              activeTab === 'spring'
                ? 'border-primary text-primary bg-surface-container-lowest rounded-t-lg'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Spring Boot JPA Models (Java)
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 font-bold text-label-md border-b-2 transition-all ${
              activeTab === 'summary'
                ? 'border-primary text-primary bg-surface-container-lowest rounded-t-lg'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            System Toolchain Overview
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto custom-scroll flex-1 text-body-sm space-y-4">
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                  <span className="font-mono text-xs text-primary font-bold block">TABLE 1</span>
                  <div className="font-bold text-on-surface text-base">users_auth</div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Stores login credentials, password hashes, roles (Student, Officer, CSO), badges, and shifts.
                  </p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                  <span className="font-mono text-xs text-primary font-bold block">TABLE 2</span>
                  <div className="font-bold text-on-surface text-base">incident_reports</div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Tracking ID (FUL-2025-0482), category, campus location, GPS, narrative, whistleblower anonymity.
                  </p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                  <span className="font-mono text-xs text-primary font-bold block">TABLE 3</span>
                  <div className="font-bold text-on-surface text-base">media_storage</div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Photo evidence, CCTV snapshots, audio notes, and SHA-256 chain-of-custody hashes.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between text-xs font-mono text-outline mb-1">
                  <span>POSTGRESQL DDL • file: /database/schema.sql</span>
                  <button
                    onClick={() => alert('Schema copied to clipboard!')}
                    className="text-primary hover:underline font-bold"
                  >
                    Copy SQL Script
                  </button>
                </div>
                <pre className="p-4 bg-inverse-surface text-surface-container-lowest rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-outline/30">
{`-- 1. USERS AUTH
CREATE TABLE users_auth (
    id SERIAL PRIMARY KEY,
    user_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'STAFF', 'DUTY_COMMANDER', 'PATROL_OFFICER', 'ADMIN')),
    badge_number VARCHAR(50),
    rank_title VARCHAR(100),
    phone_number VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. INCIDENT REPORTS
CREATE TABLE incident_reports (
    id SERIAL PRIMARY KEY,
    tracking_id VARCHAR(30) UNIQUE NOT NULL,
    incident_type VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    narrative TEXT NOT NULL,
    location_name VARCHAR(200) NOT NULL,
    campus_sector VARCHAR(50) NOT NULL,
    gps_coordinates VARCHAR(100),
    priority_level VARCHAR(20) NOT NULL DEFAULT 'Medium',
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    is_anonymous BOOLEAN DEFAULT FALSE,
    reporter_id INT REFERENCES users_auth(id) ON DELETE SET NULL,
    verification_pin VARCHAR(20),
    assigned_lead_name VARCHAR(150),
    officer_investigation_remarks TEXT,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. MEDIA STORAGE
CREATE TABLE media_storage (
    id SERIAL PRIMARY KEY,
    incident_id INT NOT NULL REFERENCES incident_reports(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'spring' && (
            <div className="space-y-4">
              <p className="text-on-surface-variant">
                Java Spring Boot backend entity mappings and REST controllers connecting to PostgreSQL using Spring Data JPA.
              </p>
              <pre className="p-4 bg-inverse-surface text-surface-container-lowest rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-outline/30">
{`// File: backend/src/main/java/ng/edu/fulafia/security/model/IncidentReport.java
@Entity
@Table(name = "incident_reports")
public class IncidentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_id", unique = true, nullable = false)
    private String trackingId;

    @Column(name = "incident_type", nullable = false)
    private String incidentType;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String narrative;

    @Column(name = "location_name", nullable = false)
    private String locationName;

    @Column(name = "campus_sector", nullable = false)
    private String campusSector;

    @Column(name = "priority_level", nullable = false)
    private String priorityLevel;

    @Column(nullable = false)
    private String status;

    @Column(name = "is_anonymous")
    private Boolean isAnonymous;

    // Getters and Setters...
}`}
              </pre>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 space-y-2">
                <h4 className="font-bold text-on-surface text-title-md">Research Toolchain Stack</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <strong className="text-primary block">Frontend</strong>
                    <span>HTML5, CSS3 (Tailwind v4), JavaScript (ES2022), React.js 19, Vite 8</span>
                  </div>
                  <div>
                    <strong className="text-primary block">Backend</strong>
                    <span>Java 17+, Spring Boot 3.x, Spring Data JPA, Spring Security</span>
                  </div>
                  <div>
                    <strong className="text-primary block">Database</strong>
                    <span>PostgreSQL 15+ (Relational Database Engine)</span>
                  </div>
                  <div>
                    <strong className="text-primary block">Deployment Target</strong>
                    <span>Federal University of Lafia (Permanent &amp; Take-off Campuses)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <span className="text-xs text-outline">Federal University of Lafia Security Research Portal</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:bg-primary-container"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
