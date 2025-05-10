#using  nodejs image
FROM node:alpine AS nodework

ENV NODE_ENV=production

#create working directory
WORKDIR /app

#copy package.json to working dir
COPY ./package.json /app 

#install all dependency
RUN npm install --only=production  # install production dependencies
RUN npm install                    # install dev dependencies


#copy from source to destination
COPY . /app 

ENV GENERATE_SOURCEMAP=false
RUN npm run build 
 
# Step 2: Use an Nginx image to serve the app
FROM nginx:alpine

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