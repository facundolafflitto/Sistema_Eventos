using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaABM_Eventos_TransferObject.ModelsDTO;

namespace SistemaABM_Eventos_Repository.Interfaces
{
    public interface IServiceLote
    {
        Task<List<LoteEntradaDTO>> PorEvento(int eventoId);
        Task<int> Crear(LoteEntradaDTO dto);
        Task<bool> Editar(LoteEntradaDTO dto);
        Task<bool> Eliminar(int id);
    }
}
