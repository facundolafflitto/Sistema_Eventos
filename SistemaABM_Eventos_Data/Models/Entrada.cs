using System;

namespace SistemaABM_Eventos_Data.Models;

public class Entrada
{
    public int EntradaId { get; set; }

    public int LoteId { get; set; }

    public int? CompraId { get; set; }

    public string? Codigo { get; set; }

    public decimal PrecioVenta { get; set; }

    public string? Estado { get; set; }

    public DateTime FechaEmision { get; set; }

    public Lote? Lote { get; set; }

    public Compra? Compra { get; set; }
}