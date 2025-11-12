namespace SistemaABM_Eventos_TransferObject.ModelsDTO;

public record ComprarRequestDTO(int? UsuarioId, string Email, string? DireccionEnvio, string MetodoPago,
                                List<ComprarItemDTO> Items);