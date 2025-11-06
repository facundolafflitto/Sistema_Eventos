using System;

namespace SistemaABM_Eventos_TransferObject.Entradas;

public class EntradaDto
{
    public int EntradaId { get; set; }

    public int LoteId { get; set; }

    public int? CompraId { get; set; }

    public string? Codigo { get; set; }

    public decimal PrecioVenta { get; set; }

    public string? Estado { get; set; }

    public DateTime FechaEmision { get; set; }
}