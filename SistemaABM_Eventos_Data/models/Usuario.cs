namespace SistemaABM_Eventos_Data.Models;
public class Usuario
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Nombre { get; set; } = "";
    public string Apellido { get; set; } = "";
    public string? Telefono { get; set; }
    public string? Direccion { get; set; }
    public DateTime Creado { get; set; } = DateTime.UtcNow;
}