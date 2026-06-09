package com.example.ecommerce.dto;

import com.example.ecommerce.entity.Order;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private UserResponse user;
    private BigDecimal totalAmount;
    private String status;
    private String shippingAddress;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public OrderResponse(Order order) {
        this.id = order.getId();
        this.user = new UserResponse(order.getUser());
        this.totalAmount = order.getTotalAmount();
        this.status = order.getStatus().name();
        this.shippingAddress = order.getShippingAddress();
        this.createdAt = order.getCreatedAt();
        this.items = order.getItems().stream().map(OrderItemResponse::new).toList();
    }

    public Long getId() { return id; }
    public UserResponse getUser() { return user; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public String getShippingAddress() { return shippingAddress; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItemResponse> getItems() { return items; }
}

