namespace SistemaABM_Eventos_TransferObject.ModelsDTO;

public record CompraDTO(int Id, string EmailContacto, DateTime Creada, decimal Total, string Estado, List<EntradaDTO> Entradas);
