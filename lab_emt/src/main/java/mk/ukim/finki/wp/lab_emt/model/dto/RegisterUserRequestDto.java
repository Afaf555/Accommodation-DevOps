package mk.ukim.finki.wp.lab_emt.model.dto;

import mk.ukim.finki.wp.lab_emt.model.domain.Role;
import mk.ukim.finki.wp.lab_emt.model.domain.User;

public record RegisterUserRequestDto(
        String username,
        String password,
        Role role
) {
    public User toUser() {
        return new User(username, password, role != null ? role : Role.ROLE_USER);
    }
}