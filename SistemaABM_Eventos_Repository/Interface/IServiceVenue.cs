namespace SistemaABM_Eventos_Repository.Interface;

using SistemaABM_Eventos_TransferObject.ModelsDTO;

public interface IServiceVenue
{
    Task<List<VenueDTO>> Listar();
    Task<int> Crear(VenueDTO dto);
    Task<bool> Editar(VenueDTO dto);
    Task<bool> Eliminar(int id);
}
