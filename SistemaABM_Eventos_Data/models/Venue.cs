namespace SistemaABM_Eventos_Data.Models;
public class Venue
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Direccion { get; set; } = "";
    public string Ciudad { get; set; } = "";
    public int CapacidadTotal { get; set; }
    public ICollection<Evento> Eventos { get; set; } = new List<Evento>();
}