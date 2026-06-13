package mk.ukim.finki.wp.lab_emt.model.dto;

import mk.ukim.finki.wp.lab_emt.model.domain.Role;
import mk.ukim.finki.wp.lab_emt.model.domain.User;

public record RegisterUserResponseDto(
        Long id,
        String username,
        Role role
) {
    public static RegisterUserResponseDto from(User user) {
        return new RegisterUserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole()
        );
    }
}