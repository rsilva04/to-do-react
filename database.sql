-- CREATED DATABASE "weekend-to-do-app"

CREATE TABLE toDo (
    "id" SERIAL PRIMARY KEY,
    "activity" VARCHAR(200) NOT NULL
);

INSERT INTO toDo ("activity")
VALUES ('Go to the gym'), ('Go grocery shopping'); 