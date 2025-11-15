using Microsoft.AspNetCore.Mvc;
using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.ModelsDTO;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

[HttpPost("login")]
public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDTO dto)
{
    var result = await _authService.Login(dto.Email, dto.Password);

    if (result is null)
        return Unauthorized();

    var (token, usuario) = result.Value;

    return Ok(new LoginResponseDTO(
        token,
        usuario.Email,
        usuario.Nombre,
        usuario.Rol   
    ));
}

}
