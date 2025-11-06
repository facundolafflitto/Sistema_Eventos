using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using SistemaABM_Eventos_TransferObject.Eventos;

namespace SistemaABM_Eventos_Repository.Interface;

public interface IServiceEvento
{
    Task<IEnumerable<EventoDto>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

    Task<EventoDto?> ObtenerPorIdAsync(int eventoId, CancellationToken cancellationToken = default);

    Task<EventoDto> CrearAsync(EventoDto eventoDto, CancellationToken cancellationToken = default);

    Task<EventoDto?> ActualizarAsync(int eventoId, EventoDto eventoDto, CancellationToken cancellationToken = default);

    Task<bool> EliminarAsync(int eventoId, CancellationToken cancellationToken = default);
}