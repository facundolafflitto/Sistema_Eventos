namespace SistemaABM_Eventos_TransferObject.ModelsDTO;

public record EntradaDTO(int Id, int EventoId, int LoteEntradaId, string Codigo, bool Validada, DateTime? FechaValidacion);
