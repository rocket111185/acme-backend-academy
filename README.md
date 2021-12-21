# acme-backend-academy
This is a solution project for the 2021 June ACME Internship Program

## dotenv

Write this into `.env` file:

```
SECRET_KEY=empty
```

Replace existing values with proper.

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
