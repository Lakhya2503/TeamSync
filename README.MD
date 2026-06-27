# PROJECT START

## BACKEND

### intalise backend

```bash

npm init -y

```

### Main Packages

```bash

npm install express pg dotenv cors

```
### Initialize TypeScript

```bash

npx tsc --init

```


### Package.json file modified

```json

"scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }

```

### tsconfig.json file modified

```json

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    "rootDir": "./src",
    "outDir": "./dist",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

```