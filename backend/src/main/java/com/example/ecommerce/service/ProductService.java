package com.example.ecommerce.service;

import com.example.ecommerce.dto.ProductRequest;
import com.example.ecommerce.dto.ProductResponse;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.repository.ProductRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> list(String search) {
        List<Product> products;
        if (search == null || search.isBlank()) {
            products = productRepository.findByActiveTrueOrderByCreatedAtDesc();
        } else {
            products = productRepository.searchActive(search);
        }
        return products.stream().map(ProductResponse::new).toList();
    }

    public Product getEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public ProductResponse get(Long id) {
        Product product = getEntity(id);
        if (!Boolean.TRUE.equals(product.getActive())) {
            throw new ResourceNotFoundException("Product not found");
        }
        return new ProductResponse(product);
    }

    @Transactional
    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        apply(product, request);
        return new ProductResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = getEntity(id);
        apply(product, request);
        return new ProductResponse(productRepository.save(product));
    }

    @Transactional
    public void delete(Long id) {
        Product product = getEntity(id);
        product.setActive(false);
        productRepository.save(product);
    }

    private void apply(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setActive(request.getActive() == null || request.getActive());
    }
}
