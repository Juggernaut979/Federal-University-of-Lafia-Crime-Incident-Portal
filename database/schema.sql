-- ==============================================================================
-- Federal University of Lafia (FULafia) Security Directorate Portal
-- Database Engine: PostgreSQL 15+
-- Schema Definition: Users Auth, Incident Reports, Media Storage
-- ==============================================================================

-- Drop tables if existing (in order of dependency)
DROP TABLE IF EXISTS media_storage CASCADE;
DROP TABLE IF EXISTS incident_reports CASCADE;
DROP TABLE IF EXISTS users_auth CASCADE;

-- 1. USERS AUTH TABLE
-- Handles student, staff, duty commanders, and patrol officer authentication & RBAC
CREATE TABLE users_auth (
    id SERIAL PRIMARY KEY,
    user_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    matric_or_staff_id VARCHAR(50),
    role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'STAFF', 'DUTY_COMMANDER', 'PATROL_OFFICER', 'CHIEF_SECURITY_OFFICER', 'ADMIN')),
    badge_number VARCHAR(50),
    rank_title VARCHAR(100),
    assigned_shift VARCHAR(50) CHECK (assigned_shift IN ('SHIFT_ALPHA_DAY', 'SHIFT_BRAVO_EVENING', 'SHIFT_CHARLIE_NIGHT', 'GENERAL_ADMIN')),
    phone_number VARCHAR(30),
    radio_callsign VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_auth_email ON users_auth(email);
CREATE INDEX idx_users_auth_role ON users_auth(role);
CREATE INDEX idx_users_auth_badge ON users_auth(badge_number);

-- 2. INCIDENT REPORTS TABLE
-- Captures tracking ID, location, incident type, priority, status, and descriptive narrative
CREATE TABLE incident_reports (
    id SERIAL PRIMARY KEY,
    tracking_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. FUL-2025-0482
    incident_type VARCHAR(100) NOT NULL,    -- Theft, Harassment, Vandalism, Dispute, Suspicious Activity, Medical
    subject VARCHAR(255) NOT NULL,
    narrative TEXT NOT NULL,
    location_name VARCHAR(200) NOT NULL,    -- e.g. Computing Lab Room 204
    campus_sector VARCHAR(50) NOT NULL CHECK (campus_sector IN ('Permanent Campus', 'Take-off Site', 'Off-Campus Vicinity')),
    gps_coordinates VARCHAR(100),          -- e.g. GPS: 8.4872° N, 8.5218° E
    priority_level VARCHAR(20) NOT NULL DEFAULT 'Medium' CHECK (priority_level IN ('Critical', 'High', 'Medium', 'Low')),
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Investigation', 'Resolved', 'Closed')),
    
    -- Reporter Details & Whistleblower Shielding
    is_anonymous BOOLEAN DEFAULT FALSE,
    reporter_id INT REFERENCES users_auth(id) ON DELETE SET NULL,
    reporter_name_override VARCHAR(150),
    reporter_matric_override VARCHAR(50),
    verification_pin VARCHAR(20),          -- 4-digit PIN for anonymous lookup
    
    -- Assignment & Tactical Dispatch
    assigned_lead_officer_id INT REFERENCES users_auth(id) ON DELETE SET NULL,
    assigned_lead_name VARCHAR(150),
    assigned_patrol_team VARCHAR(100),     -- Patrol Team 1, Patrol Team 2, Rapid Response
    officer_investigation_remarks TEXT,
    
    -- Timestamps
    incident_occurred_at TIMESTAMP WITH TIME ZONE,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incidents_tracking_id ON incident_reports(tracking_id);
CREATE INDEX idx_incidents_status ON incident_reports(status);
CREATE INDEX idx_incidents_priority ON incident_reports(priority_level);
CREATE INDEX idx_incidents_sector ON incident_reports(campus_sector);
CREATE INDEX idx_incidents_reported_at ON incident_reports(reported_at DESC);

-- 3. MEDIA STORAGE TABLE
-- Dedicated storage table for evidence photos, CCTV extracts, audio logs, and slips
CREATE TABLE media_storage (
    id SERIAL PRIMARY KEY,
    media_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    incident_id INT NOT NULL REFERENCES incident_reports(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,         -- image/jpeg, image/png, video/mp4, application/pdf
    file_size_bytes BIGINT NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,      -- Cryptographic chain of custody hash
    caption_alt_text TEXT,
    is_verified_evidence BOOLEAN DEFAULT TRUE,
    uploaded_by_user_id INT REFERENCES users_auth(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_incident_id ON media_storage(incident_id);
CREATE INDEX idx_media_sha256 ON media_storage(sha256_hash);

-- ==============================================================================
-- INITIAL SEED DATA (Aligned with Federal University of Lafia Security Records)
-- ==============================================================================

-- Seed Officers into users_auth
INSERT INTO users_auth (username, email, password_hash, full_name, role, badge_number, rank_title, assigned_shift, phone_number, radio_callsign)
VALUES
('idanladi', 'danladi.i@fulafia.edu.ng', '$2a$12$e8YkYx9.KzUqA.EXAMPLE_HASH_DUTY_COMMANDER', 'Officer I. Danladi', 'DUTY_COMMANDER', 'FUL-CSO-004', 'Duty Commander', 'SHIFT_ALPHA_DAY', '0803-000-0041', 'Alpha-Actual'),
('syakubu', 'yakubu.s@fulafia.edu.ng', '$2a$12$e8YkYx9.KzUqA.EXAMPLE_HASH_INSPECTOR', 'Inspector S. Yakubu', 'PATROL_OFFICER', 'FUL-SEC-112', 'Senior Investigation Officer', 'SHIFT_ALPHA_DAY', '0803-000-0112', 'Patrol-2-Lead'),
('boche', 'oche.b@fulafia.edu.ng', '$2a$12$e8YkYx9.KzUqA.EXAMPLE_HASH_SERGEANT', 'Sgt. B. Oche', 'PATROL_OFFICER', 'FUL-SEC-208', 'Sector Sergeant', 'SHIFT_ALPHA_DAY', '0803-000-0208', 'Patrol-1-Echo');

-- Seed Sample Incident Report (Case FUL-2025-0482)
INSERT INTO incident_reports (
    tracking_id, incident_type, subject, narrative, location_name, campus_sector, gps_coordinates, priority_level, status,
    is_anonymous, reporter_name_override, reporter_matric_override, verification_pin,
    assigned_lead_officer_id, assigned_lead_name, assigned_patrol_team, officer_investigation_remarks, reported_at
) VALUES (
    'FUL-2025-0482',
    'Theft',
    'Reported Laptop Theft at Faculty of Computing Lab',
    'Lenovo ThinkPad P1 Gen 5 laptop missing from Cyber Workstation #14 during 10:00 AM break. Workstation wire lock was sheared with a cutting tool.',
    'Faculty of Computing • Room 204 (Cyber Lab)',
    'Permanent Campus',
    'GPS: 8.4872° N, 8.5218° E (Lafia)',
    'High',
    'Under Investigation',
    FALSE,
    'Aliyu Musa',
    'SCI/21/043',
    '7941',
    2,
    'Insp. S. Yakubu',
    'Patrol Team 2',
    'Patrol 2 dispatched to interview Lab Attendant and review 09:30-10:15 corridor video log. Suspect observed heading toward Library Walkway.',
    CURRENT_TIMESTAMP
);

-- Seed Evidence Media for FUL-2025-0482
INSERT INTO media_storage (incident_id, file_name, file_url, file_type, file_size_bytes, sha256_hash, caption_alt_text)
VALUES
(1, 'IMG_0482_A.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKiJ6hK02A_wwB5P6BzHJQmCQnaMGWaPhfclFZJ7o_2fWMYxMQ-t4j9wA2JPgu8KRPb3s23wsSupyPmaZZSwqRmKcqjmY7KxEZGoG6TJfGw5kW9oFGXV6iLcgU2kJRZbGgYqjDA7YU1YlM3_26z6is9hsnWlmoWZqPO1dQm9-M5NlJTnd4UMuCwYAsbVTC77IfAGtoSPri4jvBnoKKSfEKpgaERh737dxKXOPBVWVi4tXq94B-2ggCiw', 'image/jpeg', 1845200, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Workstation sheared wire safety lock desk evidence'),
(1, 'CCTV_Cam09.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNlMOBr-Pibi5s2dDcwzkfCnfJqhIAY6WLDY1IG3TNeB2LmafqacOVyMw8bJMkxplBJ4Cedl2j1fnGUzYbp_s2eX7ZifMTELwmDeQgV-vUx3HfLjIXIc8Yt5FHocyLB5AOkhBpwcFo7n-2J-4VLWHDLMFxk52648o7jY_LfUBZ3Rn40bGpv5WAooZ1IDqMnC_uB87UVPx9NoA4-dqiqnyGzlnzHWVzQbqP__FgMLAf1T0aamGFYwKAzg', 'image/jpeg', 2410800, 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 'Security checkpoint corridor surveillance still');
