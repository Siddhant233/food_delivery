-- Insert Restaurants
INSERT INTO restaurant (restaurant_id, name, location, phone, rating)
VALUES 
    (1, 'The Burger Joint', '123 Main St, Downtown', '555-0100', 4.7),
    (2, 'Sakura Sushi', '456 Sushi Ave', '555-0200', 4.9),
    (3, 'Spice Garden', '789 Curry Ln', '555-0300', 4.5),
    (4, 'Mama''s Pizza', '12 Roma St', '555-0400', 4.6),
    (5, 'Dragon Wok', '88 Wok Way', '555-0500', 4.3),
    (6, 'Green Bowl', '101 Salad Blvd', '555-0600', 4.8),
    (7, 'Tacos El Rey', '55 Taco St', '555-0700', 4.4),
    (8, 'Sweet Tooth Bakery', '99 Cake St', '555-0800', 4.9)
ON CONFLICT DO NOTHING;

-- Since the frontend expects specific IDs (101, 102...) we can just force them.
-- If the ID column is auto increment, we can still provide it explicitly in Postgres.

INSERT INTO menu_item (menu_item_id, name, description, price, available, calories, protein_grams, carbs_grams, fat_grams, restaurant_id)
VALUES 
    (101, 'Classic Cheeseburger', 'Juicy beef patty with cheddar, lettuce, tomato and pickles', 10.99, true, 800, 40, 45, 30, 1),
    (102, 'Spicy BBQ Burger', 'Crispy chicken with spicy BBQ sauce and coleslaw', 12.49, true, 850, 35, 50, 32, 1),
    (103, 'Veggie Burger', 'Black bean patty with avocado cream and fresh toppings', 9.99, true, 600, 20, 60, 15, 1),
    (104, 'Loaded Fries', 'Crispy fries with cheese sauce and jalapenos', 5.99, true, 500, 10, 60, 25, 1),
    (105, 'Onion Rings', 'Golden battered onion rings with dipping sauce', 4.99, true, 400, 5, 50, 20, 1),
    (106, 'Craft Milkshake', 'Thick creamy shake', 6.99, true, 700, 12, 80, 20, 1),
    (107, 'Fountain Soda', 'Pepsi, Coke, Sprite', 2.49, true, 150, 0, 40, 0, 1),
    
    (201, 'House Special', 'Chef''s signature dish', 14.99, true, 600, 30, 50, 15, 2),
    (202, 'Daily Fresh Bowl', 'Fresh seasonal ingredients', 11.99, true, 450, 20, 60, 10, 2)
ON CONFLICT DO NOTHING;
