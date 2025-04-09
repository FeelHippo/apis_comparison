DROP TABLE IF EXISTS car;
CREATE TABLE car (
  id                INT AUTO_INCREMENT NOT NULL,
  model             VARCHAR(128) NOT NULL,
  year              INT,
  manufacturer      VARCHAR(255) NOT NULL,
  engineCapacity    DECIMAL(2,1) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO car
  (model, year, manufacturer, engineCapacity)
VALUES
  ('Land Cruiser', 1990, 'Toyota', 4.2),
  ('Impreza WRX', 1999, 'Subaru', 2.0),
  ('9-3', 2007, 'Saab', 2.8),
  ('Outback', 2022, 'Subaru', 2.4);