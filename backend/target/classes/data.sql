INSERT INTO products (id, name, description, price, image_url, stock, category, active)
VALUES
(1, 'Wireless Headphones', 'Noise-cancelling Bluetooth headphones with 30-hour battery life.', 129.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 50, 'Electronics', true),
(2, 'Smart Watch', 'Fitness tracking, notifications, and water-resistant design.', 199.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 35, 'Electronics', true),
(3, 'Laptop Backpack', 'Durable everyday backpack with padded laptop compartment.', 59.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 75, 'Accessories', true)
ON DUPLICATE KEY UPDATE name = VALUES(name);

