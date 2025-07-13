#using  nodejs image
FROM node:18-alpine AS nodework

#create working directory
WORKDIR /app

#copy package.json to working dir
COPY ./package.json /app 

#install all dependencies including dev dependencies
RUN npm install 

#copy from source to destination
COPY . /app 

RUN npx parcel build public/index.html --no-source-maps
#RUN npm run build
 
# Step 2: Use an Nginx image to serve the app
FROM nginx:alpine

# ENV NODE_ENV=production /not helpful, because in final build,we are only copying dist folder to nginx

COPY --from=nodework /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN date > /usr/share/nginx/html/version.txt


EXPOSE 80 443

# CMD ["nginx", "-g", "daemon off;"]


#add --host 0.0.0.0 in package.json to run in all ip addresses

#build docker image using :  docker build -f /path/to/Dockerfile -t your-image-name .

# docker build -t lc-react-app .
#docker container : docker run -d -p 2210:80 --name lc-container lc-react-app

#While refreshing the routes, it can give nginx error 404, because while refreshing, 
#React applications (when built) use client-side routing through React Router, which relies on the browser's history API to manage routes. 
#When you refresh the page, Nginx tries to resolve the route on the server-side, but since these routes don't exist on the server
#(they are handled client-side by React Router), it results in a 404 error.
#To fix this issue, you need to tell Nginx to always serve the index.html file for all routes, 
#so React Router can take over client-side routing.


#docker buildx build --platform linux/amd64 --no-cache -t lc-frontend:v2  .
#docker save -o lc-frontend.tar lc-frontend:v2
#scp lc-frontend.tar target_machine
#docker load -i lc-frontend.tar
#docker-compose stop frontend
#docker-compose up --build -d frontend

#docker-compose stop frontend && docker-compose rm -f frontend && docker-compose up --build -d frontend