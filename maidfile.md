# Serving

## serve

```bash
docker-compose up
```

## serve:build

```bash
docker-compose up --build
```

## serve:dev

```bash
yarn ts-node-dev --respawn --files .
```

## serve:prod

```bash
yarn ts-node .
```

## serve:reload

```bash
docker-compose restart discord
```

## serve:down

```bash
docker-compose down
```


# Developing

## setup

```bash
yarn
docker-compose build
```

# Cleaning

## clean:yarn

```bash
rm -rf node_modules ||:
rm yarn-error.log ||:
```
