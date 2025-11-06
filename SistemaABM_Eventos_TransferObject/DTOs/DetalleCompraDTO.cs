namespace SistemaABM_Eventos_TransferObject.Compras;

public class DetalleCompraDto
{
    public int DetalleCompraId { get; set; }

    public int CompraId { get; set; }

    public int LoteId { get; set; }

    public int Cantidad { get; set; }

    public decimal PrecioUnitario { get; set; }

    public decimal Subtotal { get; set; }
}