namespace SistemaABM_Eventos_TransferObject.ModelsDTO;

public record EventoDTO(int Id, string Nombre, string? Descripcion, DateTime FechaHora,
                        int VenueId, string VenueNombre, string? Categoria, string? ImagenPortadaUrl);