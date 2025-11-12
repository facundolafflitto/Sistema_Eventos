namespace SistemaABM_Eventos_TransferObject.ModelsDTO;

public record EventoCreateDTO(string Nombre, string? Descripcion, DateTime FechaHora,
                              int VenueId, string? Categoria, string? ImagenPortadaUrl);
