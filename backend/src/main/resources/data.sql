-- -- Insert Restaurants
-- INSERT INTO restaurants (restaurant_id, owner_id, name, description, phone, address, city, rating, is_open, created_at)
-- VALUES
--     (1, NULL, 'The Burger Joint', 'Popular burger spot', '555-0100', '123 Main St', 'Downtown', 4.7, true, CURRENT_TIMESTAMP),
--     (2, NULL, 'Sakura Sushi', 'Fresh sushi and rolls', '555-0200', '456 Sushi Ave', 'Uptown', 4.9, true, CURRENT_TIMESTAMP),
--     (3, NULL, 'Spice Garden', 'Authentic curries and more', '555-0300', '789 Curry Ln', 'Midtown', 4.5, true, CURRENT_TIMESTAMP),
--     (4, NULL, 'Mama''s Pizza', 'Hand-tossed pizzas', '555-0400', '12 Roma St', 'Oldtown', 4.6, true, CURRENT_TIMESTAMP),
--     (5, NULL, 'Dragon Wok', 'Chinese takeout favorites', '555-0500', '88 Wok Way', 'Chinatown', 4.3, true, CURRENT_TIMESTAMP),
--     (6, NULL, 'Green Bowl', 'Healthy bowls and salads', '555-0600', '101 Salad Blvd', 'Green District', 4.8, true, CURRENT_TIMESTAMP),
--     (7, NULL, 'Tacos El Rey', 'Authentic tacos', '555-0700', '55 Taco St', 'Eastside', 4.4, true, CURRENT_TIMESTAMP),
--     (8, NULL, 'Sweet Tooth Bakery', 'Breads and pastries', '555-0800', '99 Cake St', 'Bakeville', 4.9, true, CURRENT_TIMESTAMP)
-- ON CONFLICT DO NOTHING;

-- -- Since the frontend expects specific IDs (101, 102...) we can just force them.
-- -- If the ID column is auto increment, we can still provide it explicitly in Postgres.

-- INSERT INTO menu_items (item_id, restaurant_id, category_id, item_name, description, price, calories, protein_grams, carbs_grams, fat_grams, is_available, created_at)
-- VALUES
--     (101, 1, NULL, 'Classic Cheeseburger', 'Juicy beef patty with cheddar, lettuce, tomato and pickles', 10.99, 800, 40, 45, 30, true, CURRENT_TIMESTAMP),
--     (102, 1, NULL, 'Spicy BBQ Burger', 'Crispy chicken with spicy BBQ sauce and coleslaw', 12.49, 850, 35, 50, 32, true, CURRENT_TIMESTAMP),
--     (103, 1, NULL, 'Veggie Burger', 'Black bean patty with avocado cream and fresh toppings', 9.99, 600, 20, 60, 15, true, CURRENT_TIMESTAMP),
--     (104, 1, NULL, 'Loaded Fries', 'Crispy fries with cheese sauce and jalapenos', 5.99, 500, 10, 60, 25, true, CURRENT_TIMESTAMP),
--     (105, 1, NULL, 'Onion Rings', 'Golden battered onion rings with dipping sauce', 4.99, 400, 5, 50, 20, true, CURRENT_TIMESTAMP),
--     (106, 1, NULL, 'Craft Milkshake', 'Thick creamy shake', 6.99, 700, 12, 80, 20, true, CURRENT_TIMESTAMP),
--     (107, 1, NULL, 'Fountain Soda', 'Pepsi, Coke, Sprite', 2.49, 150, 0, 40, 0, true, CURRENT_TIMESTAMP),
--     (201, 2, NULL, 'House Special', 'Chef''s signature dish', 14.99, 600, 30, 50, 15, true, CURRENT_TIMESTAMP),
--     (202, 2, NULL, 'Daily Fresh Bowl', 'Fresh seasonal ingredients', 11.99, 450, 20, 60, 10, true, CURRENT_TIMESTAMP)
-- ON CONFLICT DO NOTHING;

-- ================================
-- CLEAN RESET (OPTIONAL)
-- ================================
TRUNCATE TABLE order_items, orders, cart_items, carts, menu_items, restaurants, addresses, users CASCADE;

-- ================================
-- INSERT USERS (for FK reference)
-- ================================
INSERT INTO users (user_id, name, email, password, role)
VALUES
    (1, 'Test User', 'user@test.com', '123', 'CUSTOMER'),
    (2, 'Owner User', 'owner@test.com', '123', 'RESTAURANT_OWNER')
ON CONFLICT (user_id) DO NOTHING;

-- ================================
-- INSERT RESTAURANTS
-- ================================
INSERT INTO restaurants (restaurant_id, owner_id, name, description, phone, address, city, rating, is_open, created_at)
VALUES
    (1, 2, 'The Burger Joint', 'Popular burger spot', '555-0100', '123 Main St', 'Downtown', 4.7, true, CURRENT_TIMESTAMP),
    (2, 2, 'Sakura Sushi', 'Fresh sushi and rolls', '555-0200', '456 Sushi Ave', 'Uptown', 4.9, true, CURRENT_TIMESTAMP),
    (3, 2, 'Spice Garden', 'Authentic curries and more', '555-0300', '789 Curry Ln', 'Midtown', 4.5, true, CURRENT_TIMESTAMP),
    (4, 2, 'Mama''s Pizza', 'Hand-tossed pizzas', '555-0400', '12 Roma St', 'Oldtown', 4.6, true, CURRENT_TIMESTAMP),
    (5, 2, 'Dragon Wok', 'Chinese takeout favorites', '555-0500', '88 Wok Way', 'Chinatown', 4.3, true, CURRENT_TIMESTAMP),
    (6, 2, 'Green Bowl', 'Healthy bowls and salads', '555-0600', '101 Salad Blvd', 'Green District', 4.8, true, CURRENT_TIMESTAMP),
    (7, 2, 'Tacos El Rey', 'Authentic tacos', '555-0700', '55 Taco St', 'Eastside', 4.4, true, CURRENT_TIMESTAMP),
    (8, 2, 'Sweet Tooth Bakery', 'Breads and pastries', '555-0800', '99 Cake St', 'Bakeville', 4.9, true, CURRENT_TIMESTAMP)
ON CONFLICT (restaurant_id) DO NOTHING;

-- ================================
-- INSERT MENU ITEMS
-- ================================
INSERT INTO menu_items (item_id, restaurant_id, category_id, item_name, description, price, calories, protein_grams, carbs_grams, fat_grams, is_available, created_at)
VALUES
    (101, 1, NULL, 'Classic Cheeseburger', 'Juicy beef patty with cheddar, lettuce, tomato and pickles', 10.99, 800, 40, 45, 30, true, CURRENT_TIMESTAMP),
    (102, 1, NULL, 'Spicy BBQ Burger', 'Crispy chicken with spicy BBQ sauce and coleslaw', 12.49, 850, 35, 50, 32, true, CURRENT_TIMESTAMP),
    (103, 1, NULL, 'Veggie Burger', 'Black bean patty with avocado cream and fresh toppings', 9.99, 600, 20, 60, 15, true, CURRENT_TIMESTAMP),
    (104, 1, NULL, 'Loaded Fries', 'Crispy fries with cheese sauce and jalapenos', 5.99, 500, 10, 60, 25, true, CURRENT_TIMESTAMP),
    (105, 1, NULL, 'Onion Rings', 'Golden battered onion rings with dipping sauce', 4.99, 400, 5, 50, 20, true, CURRENT_TIMESTAMP),
    (106, 1, NULL, 'Craft Milkshake', 'Thick creamy shake', 6.99, 700, 12, 80, 20, true, CURRENT_TIMESTAMP),
    (107, 1, NULL, 'Fountain Soda', 'Pepsi, Coke, Sprite', 2.49, 150, 0, 40, 0, true, CURRENT_TIMESTAMP),

    (201, 2, NULL, 'House Special', 'Chef''s signature dish', 14.99, 600, 30, 50, 15, true, CURRENT_TIMESTAMP),
    (202, 2, NULL, 'Daily Fresh Bowl', 'Fresh seasonal ingredients', 11.99, 450, 20, 60, 10, true, CURRENT_TIMESTAMP)
ON CONFLICT (item_id) DO NOTHING;

-- ================================
-- INSERT SAMPLE ADDRESS
-- ================================
INSERT INTO addresses (address_id, user_id, street, city, state, pincode)
VALUES
    (1, 1, 'Near KLE Tech', 'Belgaum', 'Karnataka', '590001')
ON CONFLICT (address_id) DO NOTHING;

-- ================================
-- OPTIONAL: VERIFY DATA
-- ================================
SELECT * FROM users;
SELECT * FROM restaurants;
SELECT * FROM menu_items;
SELECT * FROM addresses;