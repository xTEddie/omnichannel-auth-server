# Netlify Serverless Functions

## Prerequisites
- [Netlify CLI](https://www.npmjs.com/package/netlify-cli)

## Getting Started
### 1. Generate public/private key pair

```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

### 2. Create .env File

```
cp sample.env .env
```

### 3. Add Public & Private Key to .env File
```diff
-PUBLIC_KEY=""
+PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
+...
+-----END PUBLIC KEY-----"
-PRIVATE_KEY=""
+PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
+...
+-----END PRIVATE KEY-----"
-ISSUER=""
+ISSUER="http://localhost:9999"
```

### 4. Run Development Server
```
netlify functions:serve
```

## Deployment

### 1. Set Environment Variables

```
netlify env:import .env
```

### 2. Deploy

```
netlify deploy --prod
```

## APIs

### /api/publickey

```js
const baseUrl = "http://localhost:9999";
const requestUrl = `${baseUrl}/.netlify/functions/api/publickey`;
const payload = {
    method: "GET"
};

try {
    const response = await fetch(requestUrl, payload);
    const publicKey = await response.text();
    console.log(publicKey);
} catch (error) {
    console.log(error);
}
```

### /api/login

```js
const baseUrl = "http://localhost:9999";
const requestUrl = `${baseUrl}/.netlify/functions/api/login`;
const lwiContexts = {
    Name: {
        value: "Contoso",
        isDisplayable: "true"
    },
    Email: {
        value: "contoso@microsoft.com",
        isDisplayable: "true"
    },
    Secret: {
        value: "***",
    }
};
const data = {
    contactid: 'contactid', // Overwrite sub claim
    expiry: 5 * 60, // Overwrite exp claim
    lwicontexts: JSON.stringify(lwiContexts) // Add LWI Contexts
};

const payload = {
    method: "POST",
    body: JSON.stringify(data)
};

try {
    const response = await fetch(requestUrl, payload);
    const authToken = await response.text();
    console.log(authToken);
} catch (error) {
    console.log(error);
}
```