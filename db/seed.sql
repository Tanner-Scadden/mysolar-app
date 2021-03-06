CREATE TABLE Installer (
  installer_id serial,
  installer_name varchar(200) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL,
  address_id integer,
  CONSTRAINT Installer_pk PRIMARY KEY (installer_id)
) WITH (OIDS = FALSE);
CREATE TABLE Employee (
  employee_id serial,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  user_type varchar(50) NOT NULL,
  hash varchar(130) NOT NULL,
  date_created TIMESTAMP NOT NULL,
  phone_number bigint NOT NULL,
  CONSTRAINT Employee_pk PRIMARY KEY (employee_id)
) WITH (OIDS = FALSE);
CREATE TABLE Customer (
  customer_id serial,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  date_created TIMESTAMP NOT NULL,
  email varchar(100) NOT NULL,
  hash varchar(130) NOT NULL,
  phone_number bigint NOT NULL,
  CONSTRAINT Customer_pk PRIMARY KEY (customer_id)
) WITH (OIDS = FALSE);
CREATE TABLE Address (
  address_id integer NOT NULL,
  project_id integer,
  address_1 varchar(500) NOT NULL,
  address_2 varchar(500) NOT NULL,
  city varchar(150) NOT NULL,
  state varchar(100) NOT NULL,
  country varchar(150) NOT NULL,
  zip integer NOT NULL,
  CONSTRAINT Address_pk PRIMARY KEY (address_id)
) WITH (OIDS = FALSE);
CREATE TABLE Project (
  project_id serial NOT NULL,
  manager_id serial,
  customer_id serial NOT NULL,
  phase varchar(150) NOT NULL,
  last_updated TIMESTAMP NOT NULL,
  date_created TIMESTAMP NOT NULL,
  utility_company varchar(200) NOT NULL,
  CONSTRAINT Project_pk PRIMARY KEY (project_id)
) WITH (OIDS = FALSE);
CREATE TABLE Surveyor (
  surveyor_id serial NOT NULL,
  surveyor_name varchar(200) NOT NULL,
  created_at serial NOT NULL,
  address_id integer,
  CONSTRAINT Surveyor_pk PRIMARY KEY (surveyor_id)
) WITH (OIDS = FALSE);
CREATE TABLE Survey (
  survey_id serial NOT NULL,
  project_id integer NOT NULL,
  survey_date TIMESTAMP NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 'false',
  surveyor_id integer NOT NULL,
  CONSTRAINT Survey_pk PRIMARY KEY (survey_id)
) WITH (OIDS = FALSE);
CREATE TABLE Design (
  design_id serial NOT NULL,
  project_id integer NOT NULL,
  designer_id integer NOT NULL,
  date_created TIMESTAMP NOT NULL,
  proposal_link TEXT NOT NULL,
  utility_bill TEXT NOT NULL,
  CONSTRAINT Design_pk PRIMARY KEY (design_id)
) WITH (OIDS = FALSE);
CREATE TABLE Paperwork (
  file_id serial NOT NULL,
  file_link TEXT NOT NULL,
  file_name varchar(200) NOT NULL,
  date_uploaded TIMESTAMP NOT NULL,
  project_id integer NOT NULL,
  CONSTRAINT Paperwork_pk PRIMARY KEY (file_id)
) WITH (OIDS = FALSE);
CREATE TABLE Install (
  install_id serial NOT NULL,
  installer_id integer NOT NULL,
  install_date TIMESTAMP NOT NULL,
  project_id integer NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 'false',
  CONSTRAINT Install_pk PRIMARY KEY (install_id)
) WITH (OIDS = FALSE);
CREATE TABLE Event (
  event_id serial,
  event_name varchar(200) NOT NULL,
  event_start TIMESTAMP NOT NULL,
  event_end TIMESTAMP NOT NULL,
  event_type varchar(200) NOT NULL,
  employee_id integer not null,
  CONSTRAINT Event_pk PRIMARY KEY (event_id)
) WITH (OIDS = FALSE);
ALTER TABLE
  Installer
ADD
  CONSTRAINT Installer_fk0 FOREIGN KEY (address_id) REFERENCES Address(address_id);
ALTER TABLE
  Event
ADD
  CONSTRAINT Event_fk0 FOREIGN KEY (employee_id) REFERENCES Employee(employee_id);
ALTER TABLE
  Address
ADD
  CONSTRAINT Address_fk0 FOREIGN KEY (project_id) REFERENCES Project(project_id);
ALTER TABLE
  Project
ADD
  CONSTRAINT Project_fk0 FOREIGN KEY (manager_id) REFERENCES Employee(employee_id);
ALTER TABLE
  Project
ADD
  CONSTRAINT Project_fk1 FOREIGN KEY (customer_id) REFERENCES Customer(customer_id);
ALTER TABLE
  Surveyor
ADD
  CONSTRAINT Surveyor_fk0 FOREIGN KEY (address_id) REFERENCES Address(address_id);
ALTER TABLE
  Survey
ADD
  CONSTRAINT Survey_fk0 FOREIGN KEY (project_id) REFERENCES Project(project_id);
ALTER TABLE
  Survey
ADD
  CONSTRAINT Survey_fk1 FOREIGN KEY (surveyor_id) REFERENCES Surveyor(surveyor_id);
ALTER TABLE
  Design
ADD
  CONSTRAINT Design_fk0 FOREIGN KEY (project_id) REFERENCES Project(project_id);
ALTER TABLE
  Design
ADD
  CONSTRAINT Design_fk1 FOREIGN KEY (designer_id) REFERENCES Employee(employee_id);
ALTER TABLE
  Paperwork
ADD
  CONSTRAINT Paperwork_fk0 FOREIGN KEY (project_id) REFERENCES Project(project_id);
ALTER TABLE
  Install
ADD
  CONSTRAINT Install_fk0 FOREIGN KEY (installer_id) REFERENCES Installer(installer_id);
ALTER TABLE
  Install
ADD
  CONSTRAINT Install_fk1 FOREIGN KEY (project_id) REFERENCES Project(project_id);


insert into Event (event_name, event_start, event_end, event_type, employee_id) 
values
('Weekly Meeting', '2019-06-03 13:00:00', '2019-06-03 14:21:06', 'Group Meeting', 2),
('Weekly Meeting', '2019-06-10 13:00:00', '2019-06-10 14:21:06', 'Group Meeting', 2),
('Weekly Meeting', '2019-06-17 13:00:00', '2019-06-17 14:21:06', 'Group Meeting', 2),
('Weekly Meeting', '2019-06-24 13:00:00', '2019-06-24 14:21:06', 'Group Meeting', 2),
('1 on 1', '2019-06-12 10:21:06', '2019-06-12 10:21:06', '1 on 1', 2),
('1 on 1', '2019-06-26 10:21:06', '2019-06-26 10:21:06', '1 on 1', 2),
('Dentist', '2019-06-05 13:21:00', '2019-06-03 05:21:00', 'Personal', 2);