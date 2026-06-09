package com.example.ecommerce.dto;

import com.example.ecommerce.entity.CartItem;
import java.math.BigDecimal;

public class CartItemResponse {
    private Long id;
    private ProductResponse product;
    private Integer quantity;
    private BigDecimal lineTotal;

    public CartItemResponse(CartItem item) {
        this.id = item.getId();
        this.product = new ProductResponse(item.getProduct());
        this.quantity = item.getQuantity();
        this.lineTotal = item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
    }

    public Long getId() { return id; }
    public ProductResponse getProduct() { return product; }
    public Integer getQuantity() { return quantity; }
    public BigDecimal getLineTotal() { return lineTotal; }
}

