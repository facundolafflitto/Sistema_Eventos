namespace SistemaABM_Eventos_Data.Models;
public class Compra
{
    public int Id { get; set; }
    public int? UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
    public string EmailContacto { get; set; } = "";
    public DateTime Creada { get; set; } = DateTime.UtcNow;
    public decimal Total { get; set; }
    public string Estado { get; set; } = "Creado";
    public string? DireccionEnvio { get; set; }
    public string MetodoPago { get; set; } = "Simulado";
    public ICollection<Entrada> Entradas { get; set; } = new List<Entrada>();
}