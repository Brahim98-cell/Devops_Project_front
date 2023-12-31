# Use an official Nginx image as a parent image
FROM nginx:latest

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY my-nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular app files into the Nginx web server directory
COPY dist/ /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx with the "daemon off;" option to run in the foreground
CMD ["nginx", "-g", "daemon off;"]
