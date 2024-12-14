USE icons;

CREATE TABLE IF NOT EXISTS icons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon_path VARCHAR(255) NOT NULL,
    description TEXT,
    tag VARCHAR(255)
);