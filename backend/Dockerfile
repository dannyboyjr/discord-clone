FROM python:3.9-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the project dependencies
RUN pip install -r requirements.txt
RUN pip install flask-socketio

# Copy the rest of the project files to the container
COPY . .

# Expose the port on which your Flask app is running
EXPOSE 5000

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]