namespace SistemaABM_Eventos_TransferObject.Venues;

public class VenueDto
{
    public int VenueId { get; set; }

    public string? Nombre { get; set; }

    public string? Direccion { get; set; }

    public int Capacidad { get; set; }

    public string? Ciudad { get; set; }

    public string? Pais { get; set; }
}