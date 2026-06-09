package com.example.ecommerce.config;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.Role;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;
import java.math.BigDecimal;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createUser("Admin User", "admin@example.com", "Admin@123", Role.ROLE_ADMIN);
        createUser("Demo User", "user@example.com", "User@123", Role.ROLE_USER);

        if (productRepository.count() == 0) {
            createProduct("Wireless Headphones", "Noise-cancelling Bluetooth headphones with 30-hour battery life.", "Electronics", "129.99", 50, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e");
            createProduct("Smart Watch", "Fitness tracking, notifications, and water-resistant design.", "Electronics", "199.99", 35, "https://images.unsplash.com/photo-1523275335684-37898b6baf30");
            createProduct("Laptop Backpack", "Durable everyday backpack with padded laptop compartment.", "Accessories", "59.99", 75, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62");
        }
    }

    private void createUser(String name, String email, String password, Role role) {
        if (userRepository.existsByEmail(email)) {
            return;
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        userRepository.save(user);
    }

    private void createProduct(String name, String description, String category, String price, int stock, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setCategory(category);
        product.setPrice(new BigDecimal(price));
        product.setStock(stock);
        product.setImageUrl(imageUrl);
        product.setActive(true);
        productRepository.save(product);
    }
}
