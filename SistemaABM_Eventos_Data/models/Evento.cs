namespace SistemaABM_Eventos_Data.Models;

public class Evento
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string? Descripcion { get; set; }
    public DateTime FechaHora { get; set; }
    public int VenueId { get; set; }
    public Venue Venue { get; set; } = null!;
    public string? Categoria { get; set; }
    public string? ImagenPortadaUrl { get; set; }
    public ICollection<LoteEntrada> Lotes { get; set; } = new List<LoteEntrada>();
}