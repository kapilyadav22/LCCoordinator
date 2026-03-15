FROM node:18-alpine AS nodework

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx parcel build public/index.html --no-source-maps



FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=nodework /app/dist /usr/share/nginx/html

# Copy nginx config to the CORRECT location
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN date > /usr/share/nginx/html/version.txt

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


#React applications (when built) use client-side routing through React Router, which relies on the browser's history API to manage routes. 
#When you refresh the page, Nginx tries to resolve the route on the server-side, but since these routes don't exist on the server
#(they are handled client-side by React Router), it results in a 404 error.
#To fix this issue, you need to tell Nginx to always serve the index.html file for all routes, 
#so React Router can take over client-side routing.


#docker buildx build --platform linux/amd64 --no-cache -t lc-frontend:v2  .
#docker save -o lc-frontend.tar lc-frontend:v2
#scp lc-frontend.tar root@139.59.22.18:/root/
#docker load -i lc-frontend.tar
#docker compose stop frontend
#docker compose up --build -d frontend

#docker compose stop frontend && docker compose rm -f frontend && docker compose up --build -d frontend