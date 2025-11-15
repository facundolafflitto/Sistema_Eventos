namespace SistemaABM_Eventos_Repository.Interface
{
    using SistemaABM_Eventos_TransferObject.ModelsDTO;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IServiceCompra
    {
        Task<CompraDTO> Comprar(ComprarRequestDTO dto);

        Task<CheckInDTO> Validar(string codigo);

        Task<List<CompraDTO>> ObtenerPorUsuario(int usuarioId);
    }
}
