namespace SistemaABM_Eventos_Repository.Interface;

using SistemaABM_Eventos_TransferObject.ModelsDTO;

public interface IServiceUsuario
{
    Task<UsuarioDTO?> Login(LoginRequestDTO req);
    Task<int> Register(UsuarioDTO dto, string password);
}