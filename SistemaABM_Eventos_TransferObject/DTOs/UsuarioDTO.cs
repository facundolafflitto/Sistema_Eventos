using System;

namespace SistemaABM_Eventos_TransferObject.Usuarios;

public class UsuarioDto
{
    public int UsuarioId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public bool EsOrganizador { get; set; }

    public DateTime FechaRegistro { get; set; }
}