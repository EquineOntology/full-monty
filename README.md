# full-monty-backend

Backend code for Full Monty

The code is thus organized:

- `.docker`: anything related to Docker except the `.dockerignore` file
- `config`: configuration of the app
- `jobs`: job classes, including the base `Job.ts`
- `listeners`: event listener classes
- `loaders`: single-concern files for the loading process
- `models`: classes related to handling datastore models, including the base `Model.ts`
- `routes`: API route definitions
- `services`: business logic
- `tests`: testing suites
- `types`: typescript definitions and interfaces
