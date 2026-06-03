package com.letsplay.service;

import com.letsplay.dto.UserResponse;
import com.letsplay.exception.ResourceNotFoundException;
import com.letsplay.model.User;
import com.letsplay.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::from)
                .toList();
    }

    public UserResponse getUserById(String id) {
        return UserResponse.from(findById(id));
    }

    public void deleteUser(String id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
