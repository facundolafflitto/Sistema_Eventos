using System.Collections.Generic;

namespace SistemaABM_Eventos_Data.Models;

public class Venue
{
    public int VenueId { get; set; }

    public string? Nombre { get; set; }

    public string? Direccion { get; set; }

    public int Capacidad { get; set; }

    public string? Ciudad { get; set; }

    public string? Pais { get; set; }

    public ICollection<Evento> Eventos { get; set; } = new HashSet<Evento>();
}