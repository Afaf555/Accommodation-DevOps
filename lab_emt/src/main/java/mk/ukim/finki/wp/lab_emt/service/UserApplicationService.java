package mk.ukim.finki.wp.lab_emt.service;

import java.util.List;
import java.util.Optional;
import mk.ukim.finki.wp.lab_emt.model.dto.LoginUserRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.LoginUserResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.RegisterUserRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.RegisterUserResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.UserUpdateRequestDto;

public interface UserApplicationService {
    Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto);

    Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto);

    Optional<RegisterUserResponseDto> findByUsername(String username);

    List<RegisterUserResponseDto> findAll();

    Optional<RegisterUserResponseDto> findById(Long id);

    Optional<RegisterUserResponseDto> update(Long id, UserUpdateRequestDto dto);

    void delete(Long id);
}