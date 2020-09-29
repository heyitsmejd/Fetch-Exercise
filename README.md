# Fetch-Exercise

This is an example web application that retrieves data from "https://fetch-hiring.s3.amazonaws.com/hiring.json" and displays it in a list.

The requirements for the project are as following:
<ul>
    <li>Display all the items grouped by "listId"</li>
    <li>Sort the results first by "listId" then by "name" when displaying.</li>
    <li>Filter out any items where "name" is blank or null.</li>
</ul>

Originally I opted to do it using no frameworks; However, the host that contains the json file requires CORS, so I had to create a mini backend to retrieve the file, and then pass it to the frontend. Nuxt.js for Vue handles a lot of that legwork for me, so I opted for that route to get it done quickly. 


## You can view this application online at
<https://fetch-exercise.herokuapp.com/>

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
