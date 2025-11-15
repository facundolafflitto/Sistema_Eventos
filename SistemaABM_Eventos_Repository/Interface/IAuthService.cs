using SistemaABM_Eventos_Data.Models;

public interface IAuthService
{
    Task<(string token, Usuario usuario)?> Login(string email, string password);
}
