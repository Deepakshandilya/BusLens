DROP TABLE IF EXISTS route_stops;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS stops;

CREATE TABLE stops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_stops_name (name)
);

CREATE TABLE routes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_number VARCHAR(50) NOT NULL,
  direction ENUM('UP','DOWN') NOT NULL,
  UNIQUE KEY uq_route_number_direction (route_number, direction)
);

CREATE TABLE route_stops (
  route_id INT NOT NULL,
  stop_id INT NOT NULL,
  sequence_no INT NOT NULL,

  PRIMARY KEY (route_id, stop_id),
  UNIQUE KEY uq_route_sequence (route_id, sequence_no),

  CONSTRAINT fk_route_stops_route
    FOREIGN KEY (route_id) REFERENCES routes(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_route_stops_stop
    FOREIGN KEY (stop_id) REFERENCES stops(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_stops_name ON stops(name);
CREATE INDEX idx_route_stops_stop_id ON route_stops(stop_id);
CREATE INDEX idx_route_stops_route_seq ON route_stops(route_id, sequence_no);