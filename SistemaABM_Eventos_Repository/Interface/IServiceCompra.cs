namespace SistemaABM_Eventos_Repository.Interface;

using SistemaABM_Eventos_TransferObject.ModelsDTO;

public interface IServiceCompra
{
    Task<CompraDTO> Comprar(ComprarRequestDTO dto);
    Task<CheckInDTO> Validar(string codigo);
}