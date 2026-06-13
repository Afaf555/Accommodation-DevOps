package mk.ukim.finki.wp.lab_emt.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import mk.ukim.finki.wp.lab_emt.helpers.JwtHelper;
import mk.ukim.finki.wp.lab_emt.model.domain.User;
import mk.ukim.finki.wp.lab_emt.model.dto.LoginUserRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.LoginUserResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.RegisterUserRequestDto;
import mk.ukim.finki.wp.lab_emt.model.dto.RegisterUserResponseDto;
import mk.ukim.finki.wp.lab_emt.model.dto.UserUpdateRequestDto;
import mk.ukim.finki.wp.lab_emt.service.UserApplicationService;
import mk.ukim.finki.wp.lab_emt.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserApplicationServiceImpl implements UserApplicationService {
    private final UserService userService;
    private final JwtHelper jwtHelper;

    public UserApplicationServiceImpl(UserService userService, JwtHelper jwtHelper) {
        this.userService = userService;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto) {
        User user = userService.register(registerUserRequestDto.toUser());
        RegisterUserResponseDto displayUserDto = RegisterUserResponseDto.from(user);
        return Optional.of(displayUserDto);
    }

    @Override
    public Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto) {
        User user = userService.login(loginUserRequestDto.username(), loginUserRequestDto.password());
        String token = jwtHelper.generateToken(user);
        return Optional.of(new LoginUserResponseDto(token));
    }

    @Override
    public Optional<RegisterUserResponseDto> findByUsername(String username) {
        return userService
                .findByUsername(username)
                .map(RegisterUserResponseDto::from);
    }

    @Override
    public List<RegisterUserResponseDto> findAll() {
        return userService.findAll()
                .stream()
                .map(RegisterUserResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RegisterUserResponseDto> findById(Long id) {
        return userService.findById(id)
                .map(RegisterUserResponseDto::from);
    }

    @Override
    public Optional<RegisterUserResponseDto> update(Long id, UserUpdateRequestDto dto) {
        return userService.update(id, dto.username())
                .map(RegisterUserResponseDto::from);
    }

    @Override
    public void delete(Long id) {
        userService.deleteById(id);
    }
}