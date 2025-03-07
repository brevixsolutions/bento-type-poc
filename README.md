- [x] Set up the Database from the Docker
- [x] Connect to the Database from the Application
- [x] Set up Drizzle ORM
- [x] Define All the entities
- [x] Set up the Database Migrations
- [x] Set up the Login logic
- [ ] Set up the Registration logic
- [ ] Set up the Logout logic
- [x] Set up the CRUD operations
- [ ] Set up the Protected Routes

Starting a new docker postgres container

```sh
docker run -d --name postgres-container -p 5432:5432 -e POSTGRES_PASSWORD=test123 -d postgres
```

### Only to be used by Ayush

To restart your stopped Docker container, you can use the following command:

```sh
docker start 583413dd6626
```

This will start the container in the background with the same settings as before.

If you need to attach to the container's logs or interact with it, you can use:

```sh
docker logs -f 583413dd6626
```

or

```sh
docker attach 583413dd6626
```

If the container was running a server that needs to be executed manually, you might need to run it interactively using:

```sh
docker restart 583413dd6626
```

If the container exits immediately after starting, check its logs for errors:

```sh
docker logs 583413dd6626
```
