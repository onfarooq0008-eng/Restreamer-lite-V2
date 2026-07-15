FROM node:20-slim
RUN apt update && apt install -y ffmpeg sqlite3 && apt clean
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN mkdir -p videos uploads music logos database
EXPOSE 8000
CMD ["node","server.js"]
