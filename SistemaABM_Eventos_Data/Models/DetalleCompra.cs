namespace SistemaABM_Eventos_Data.Models;

public class DetalleCompra
{
    public int DetalleCompraId { get; set; }

    public int CompraId { get; set; }

    public int LoteId { get; set; }

    public int Cantidad { get; set; }

    public decimal PrecioUnitario { get; set; }

    public decimal Subtotal { get; set; }

    public Compra? Compra { get; set; }

    public Lote? Lote { get; set; }
}