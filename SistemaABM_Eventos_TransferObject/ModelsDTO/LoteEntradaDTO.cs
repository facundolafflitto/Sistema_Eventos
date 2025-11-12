namespace SistemaABM_Eventos_TransferObject.ModelsDTO;

public record LoteEntradaDTO(int Id, int EventoId, string Nombre, decimal Precio, int Cupo, int Vendidas,
                             DateTime VigenteDesde, DateTime? VigenteHasta);