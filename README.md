# acme-backend-academy

This is a solution project for the 2021 June ACME Internship Program

## Environmental properties

You should set the following properties:

* SECRET_KEY (The secret key for access to API)
* API_URL (the API should have scheme similar to Salesforce OCAPI)
* SENTRY_KEY (The key for Sentry monitoring system)
* SENTRY_PROJECT_ID (The project ID for Sentry monitoring system)

## Useful commands

### Launch development server

```
npm run dev
```

This command uses `nodemon` and `watchdog`, which control
state of the watched files.

Type `rs` in propmt in order to restart the server (sometimes
it doesn't restart itself).

### Launch production server

Simple `npm start`. But also you should add SECRET_KEY either to
NODE_ENV or `.env` file.

### Testing

```
npm t
```

Or:

```
npx jest
```

Both commands are equal.

Test files are in `tests`. They contain useful tricks and jokes
which are supposed to be funny.

### Author

Rekechynsky Dmytro, a coding guy.
