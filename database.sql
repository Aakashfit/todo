//first table


CREATE TABLE customers(
   customer_id INT GENERATED ALWAYS AS IDENTITY,
   customer_name VARCHAR(255) NOT NULL,
   list VARCHAR (800),
   PRIMARY KEY(customer_id)
  
);









//second table
CREATE TABLE contacts(
   contact_id INT GENERATED ALWAYS AS IDENTITY,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)
);




//third table used one

CREATE TABLE index(id BIGSERIAL PRIMARY KEY NOT NULL,
name VARCHAR(200) NOT NULL,
email VARCHAR(200)NOT NULL,
list VARCHAR(600),
password varchar(200) NOT NULL,
UNIQUE (email));




