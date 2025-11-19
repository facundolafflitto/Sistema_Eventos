public record EntradaDTO(
    int Id,
    int EventoId,
    int LoteEntradaId,
    string Codigo,
    bool Validada,
    DateTime? FechaValidacion,
    string EventoNombre,
    string LoteNombre,
    decimal Precio
);
