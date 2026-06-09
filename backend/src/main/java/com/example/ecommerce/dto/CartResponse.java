package com.example.ecommerce.dto;

import com.example.ecommerce.entity.Cart;
import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal total;

    public CartResponse(Cart cart) {
        this.id = cart.getId();
        this.items = cart.getItems().stream().map(CartItemResponse::new).toList();
        this.total = items.stream()
                .map(CartItemResponse::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Long getId() { return id; }
    public List<CartItemResponse> getItems() { return items; }
    public BigDecimal getTotal() { return total; }
}

