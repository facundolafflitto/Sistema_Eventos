using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SistemaABM_Eventos_Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SistemaABM_Eventos_Data.Models;
using SistemaABM_Eventos_Repository.Interface;

public class AuthService : IAuthService
{
    private readonly BDSistemaEventosContext _db;
    private readonly IConfiguration _config;

    public AuthService(BDSistemaEventosContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<(string token, Usuario usuario)?> Login(string email, string password)
    {
        var user = await _db.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return null;

        if (user.PasswordHash != password) return null;

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, user.Rol) // 👈 AHORA SÍ
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return (jwt, user);
    }
}
