namespace SistemaABM_Eventos_Data.Models;
public class Entrada
{
    public int Id { get; set; }
    public int CompraId { get; set; }
    public Compra Compra { get; set; } = null!;
    public int EventoId { get; set; }
    public Evento Evento { get; set; } = null!;
    public int LoteEntradaId { get; set; }
    public LoteEntrada LoteEntrada { get; set; } = null!;
    public string Codigo { get; set; } = "";
    public bool Validada { get; set; }
    public DateTime? FechaValidacion { get; set; }
}