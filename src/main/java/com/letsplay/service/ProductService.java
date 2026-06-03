package com.letsplay.service;

import com.letsplay.dto.ProductRequest;
import com.letsplay.dto.ProductResponse;
import com.letsplay.exception.ForbiddenActionException;
import com.letsplay.exception.ResourceNotFoundException;
import com.letsplay.model.Product;
import com.letsplay.model.Role;
import com.letsplay.repository.ProductRepository;
import com.letsplay.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    public ProductResponse getProductById(String id) {
        return ProductResponse.from(findById(id));
    }

    public ProductResponse createProduct(ProductRequest request, CustomUserDetails currentUser) {
        if (currentUser == null) {
            throw new ForbiddenActionException("Authentication required");
        }

        Product product = Product.builder()
                .name(request.name().trim())
                .description(request.description().trim())
                .price(request.price())
                .userId(currentUser.getId())
                .build();

        return ProductResponse.from(productRepository.save(product));
    }

    public ProductResponse updateProduct(String id, ProductRequest request, CustomUserDetails currentUser) {
        if (currentUser == null) {
            throw new ForbiddenActionException("Authentication required");
        }

        Product product = findById(id);
        ensureOwnerOrAdmin(product, currentUser);

        product.setName(request.name().trim());
        product.setDescription(request.description().trim());
        product.setPrice(request.price());

        return ProductResponse.from(productRepository.save(product));
    }

    public void deleteProduct(String id, CustomUserDetails currentUser) {
        if (currentUser == null) {
            throw new ForbiddenActionException("Authentication required");
        }

        Product product = findById(id);
        ensureOwnerOrAdmin(product, currentUser);
        productRepository.delete(product);
    }

    private Product findById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private void ensureOwnerOrAdmin(Product product, CustomUserDetails currentUser) {
        boolean isAdmin = currentUser.getUser().getRole() == Role.ADMIN;
        boolean isOwner = Objects.equals(product.getUserId(), currentUser.getId());

        if (!isAdmin && !isOwner) {
            throw new ForbiddenActionException("You can only manage your own products");
        }
    }
}