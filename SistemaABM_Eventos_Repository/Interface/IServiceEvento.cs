namespace SistemaABM_Eventos_Repository.Interface;

using SistemaABM_Eventos_TransferObject.ModelsDTO;

public interface IServiceEvento
{
    Task<List<EventoDTO>> Listar(string? query, DateTime? desde, DateTime? hasta, int page, int pageSize);
    Task<EventoDTO?> Obtener(int id);
    Task<int> Crear(EventoCreateDTO dto);
    Task<bool> Editar(int id, EventoCreateDTO dto);
    Task<bool> Eliminar(int id);
}