package com.letsplay.dto;

import com.letsplay.model.Role;
import com.letsplay.model.User;

public record UserResponse(
        String id,
        String name,
        String email,
        Role role
) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
