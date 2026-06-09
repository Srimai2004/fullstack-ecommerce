package com.example.ecommerce.service;

import com.example.ecommerce.dto.AddCartItemRequest;
import com.example.ecommerce.dto.CartResponse;
import com.example.ecommerce.dto.UpdateCartItemRequest;
import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.CartItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.exception.BadRequestException;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.repository.CartItemRepository;
import com.example.ecommerce.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    private final UserService userService;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductService productService, UserService userService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productService = productService;
        this.userService = userService;
    }

    @Transactional
    public CartResponse getCart() {
        return new CartResponse(getOrCreateCart(userService.currentUser()));
    }

    @Transactional
    public CartResponse addItem(AddCartItemRequest request) {
        Product product = productService.getEntity(request.getProductId());
        if (!Boolean.TRUE.equals(product.getActive())) {
            throw new ResourceNotFoundException("Product not found");
        }
        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Requested quantity exceeds stock");
        }
        Cart cart = getOrCreateCart(userService.currentUser());
        CartItem item = cartItemRepository.findByCartAndProduct(cart, product).orElseGet(() -> {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(0);
            cart.getItems().add(newItem);
            return newItem;
        });
        int newQuantity = item.getQuantity() + request.getQuantity();
        if (product.getStock() < newQuantity) {
            throw new BadRequestException("Requested quantity exceeds stock");
        }
        item.setQuantity(newQuantity);
        cartItemRepository.save(item);
        return new CartResponse(cart);
    }

    @Transactional
    public CartResponse updateItem(Long productId, UpdateCartItemRequest request) {
        Cart cart = getOrCreateCart(userService.currentUser());
        Product product = productService.getEntity(productId);
        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Requested quantity exceeds stock");
        }
        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);
        return new CartResponse(cart);
    }

    @Transactional
    public CartResponse removeItem(Long productId) {
        Cart cart = getOrCreateCart(userService.currentUser());
        Product product = productService.getEntity(productId);
        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        return new CartResponse(cart);
    }

    @Transactional
    public void clearCart() {
        Cart cart = getOrCreateCart(userService.currentUser());
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }
}
