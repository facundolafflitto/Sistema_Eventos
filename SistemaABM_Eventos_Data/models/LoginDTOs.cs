public record LoginRequestDTO(string Email, string Password);
public record LoginResponseDTO(
    string Token,
    string Email,
    string Nombre,
    string Rol
);

