using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SistemaABM_Eventos_Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class AuthService : IAuthService
{
    private readonly BDSistemaEventosContext _db;
    private readonly IConfiguration _config;

    public AuthService(BDSistemaEventosContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<string?> Login(string email, string password)
    {
        Console.WriteLine($"Intentando login con email: {email}");

        var user = await _db.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null)
        {
            Console.WriteLine("Usuario no encontrado.");
            return null;
        }

        Console.WriteLine($"Usuario encontrado: {user.Email}");

        // Comparación directa sin hash
        if (user.PasswordHash != password)
        {
            Console.WriteLine("Contraseña inválida.");
            return null;
        }

        Console.WriteLine("Login exitoso");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email)
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

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
