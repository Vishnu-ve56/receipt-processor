# Receipt Processor API

## Overview

This is a coding challenge sent by Fetch.

The **Receipt Processor API** is a web service designed to process receipts and calculate points based on predefined rules. It provides functionality to submit receipts and retrieve points for them using a unique ID.

### Features

- **POST /receipts/process**: Accepts a receipt in JSON format, processes it, and returns a unique receipt ID.
- **GET /receipts/{id}/points**: Retrieves the total points awarded for the receipt with the given ID.

### Points Calculation Rules

1. **1 point** for every alphanumeric character in the retailer name.
2. **50 points** if the total is a round dollar amount (no cents).
3. **25 points** if the total is a multiple of 0.25.
4. **5 points** for every 2 items on the receipt.
5. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
6. **6 points** if the day in the purchase date is odd.
7. **10 points** if the time of purchase is between 2:00 PM and 4:00 PM.

---

## Folder Structure

The project is organized into a modular structure for clarity, scalability, and maintainability.


### Why This Structure?

1. **Separation of Concerns**:
   - **Controllers**: Handle HTTP request/response logic and delegate business logic to services.
   - **Services**: Encapsulate business rules (e.g., point calculations) for reuse and easy testing.
   - **Routes**: Define API endpoints, keeping routing logic clean and separate.
2. **Scalability**: This structure supports adding new features without disrupting the existing codebase.
3. **Maintainability**: Developers can easily locate and modify specific functionality.

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [Postman](https://www.postman.com/) or any API testing tool

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/receipt-processor.git
   cd receipt-processor

2. Install Dependencies
    ```bash
    npm install

3. Start the server
    ```bash
    node app.js

4. The API will be running on http://localhost:3000


## Running the Receipt Processor API with Docker

## Prerequisites
- Docker installed on your system ([Get Docker](https://docs.docker.com/get-docker/)).

### Steps to Run the Application

#### 1. Build the Docker Image
Run the following command in the root directory of the project:

   
    docker build -t receipt-processor .

#### 2. Run the Docker Container

   
    docker run -p 3000:3000 receipt-processor

#### 3. Access the API

    The application will be running on http://localhost:3000

## Author

This project was developed by:

- **Vishnu Vinod Erapalli**  
  [GitHub Profile](https://github.com/Vishnu-ve56)  
  [LinkedIn Profile](https://www.linkedin.com/in/vishnu-erapalli01/)  
  [Email](mailto:vishnuerapalli01@gmail.com)


