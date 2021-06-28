INSERT INTO department (name)
VALUES 
('Sales'),
('Service'),      
('Technical Support'),
('Finance'),
('Human Resources'),
('Legal'),
('Executives');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 90000, 1),
('Payment Specialist', 85000, 1),
('Sales Specialist', 70000, 2),
('Retail Executive', 75000, 3),
('CEO', 200000, 1),
('Technical Specialist', 50000, 7),
('Technical Expert', 60000, 6),
('Genius', 70000, 2),
('Account Manager', 120000, 5),
('Sales Manager', 160000, 2),
('Human Reasources Manager', 80000, 4),
('Software Engineer', 200000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Deja', 'Martin', 7, NULL),
('Lola', 'Davidov', 1, NULL),
('Davina', 'Palmer', 2, 1),
('Ralph', 'Giovinazzo', 2, 2),
('Shuran', 'Jhandu', 4, 3),
('Jennifer', 'Drieberg', 5, 2),
('Michael', 'Silverman', 7, 1),
('Neisha', 'Martin', 7, 3),
('Anita', 'Graver', 9, 2),
('Karen', 'East', 2, 7),
('Bianca', 'Nugara', 9, 1),
('Jaden', 'Smith', 5, 6),
('Amani', 'Freeman', 3, 6),