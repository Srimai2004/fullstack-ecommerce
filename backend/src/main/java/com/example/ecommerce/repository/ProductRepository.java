package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrueOrderByCreatedAtDesc();

    @Query("""
            select p from Product p
            where p.active = true and (
                lower(p.name) like lower(concat('%', :search, '%')) or
                lower(p.category) like lower(concat('%', :search, '%')) or
                lower(p.description) like lower(concat('%', :search, '%'))
            )
            order by p.createdAt desc
            """)
    List<Product> searchActive(@Param("search") String search);
}
