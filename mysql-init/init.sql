USE icons;

CREATE TABLE IF NOT EXISTS icons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon_path VARCHAR(255) NOT NULL,
    description TEXT,
    tag VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert tags
INSERT INTO tags (name) VALUES ('whatsapp');
INSERT INTO tags (name) VALUES ('ios_system');
INSERT INTO tags (name) VALUES ('android_system');
INSERT INTO tags (name) VALUES ('messenger');
INSERT INTO tags (name) VALUES ('instagram');
INSERT INTO tags (name) VALUES ('facebook');
INSERT INTO tags (name) VALUES ('google_maps');