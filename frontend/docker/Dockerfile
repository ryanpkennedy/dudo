# build stage
FROM node:16 AS build
WORKDIR /app 
COPY . .
RUN npm install
RUN npm run build

#run stage
FROM node:16 as prod
WORKDIR /app
COPY package.json ./
RUN npm install -g serve
# COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
CMD ["serve", "-s", "build"]