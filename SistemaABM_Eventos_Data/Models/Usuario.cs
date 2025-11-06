using System;
using System.Collections.Generic;

namespace SistemaABM_Eventos_Data.Models;

public class Usuario
{
    public int UsuarioId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public bool EsOrganizador { get; set; }

    public DateTime FechaRegistro { get; set; }

    public ICollection<Evento> EventosOrganizados { get; set; } = new HashSet<Evento>();

    public ICollection<Compra> Compras { get; set; } = new HashSet<Compra>();
}