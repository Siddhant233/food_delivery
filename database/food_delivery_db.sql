--users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(20) CHECK (role IN ('CUSTOMER','ADMIN','RESTAURANT_OWNER','DELIVERY_AGENT')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--addresses
CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    street TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

--restaurants
CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(user_id),
    name VARCHAR(150),
    description TEXT,
    phone VARCHAR(15),
    address TEXT,
    city VARCHAR(100),
    rating DECIMAL(2,1),
    is_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--categories
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100)
);

--menu_items
CREATE TABLE menu_items (
    item_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id),
    item_name VARCHAR(150),
    description TEXT,
    price DECIMAL(10,2),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--carts
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--cart_items
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id) ON DELETE CASCADE,
    item_id INT REFERENCES menu_items(item_id),
    quantity INT DEFAULT 1
);

--orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    restaurant_id INT REFERENCES restaurants(restaurant_id),
    address_id INT REFERENCES addresses(address_id),
    total_amount DECIMAL(10,2),
    order_status VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--order_items
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    item_id INT REFERENCES menu_items(item_id),
    quantity INT,
    price DECIMAL(10,2)
);

--payments
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    payment_method VARCHAR(20),
    payment_status VARCHAR(20),
    transaction_id VARCHAR(200),
    paid_at TIMESTAMP
);

--delivery_agents
CREATE TABLE delivery_agents (
    agent_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    vehicle_type VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE
);

--deliveries
CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    agent_id INT REFERENCES delivery_agents(agent_id),
    pickup_time TIMESTAMP,
    delivered_time TIMESTAMP,
    status VARCHAR(30)
);

--reviews
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    restaurant_id INT REFERENCES restaurants(restaurant_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
