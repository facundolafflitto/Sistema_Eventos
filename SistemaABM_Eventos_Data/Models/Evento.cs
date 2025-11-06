using System;
using System.Collections.Generic;

namespace SistemaABM_Eventos_Data.Models;

public class Evento
{
    public int EventoId { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Codigo { get; set; }

    public string? Estado { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateTime FechaFin { get; set; }

    public int VenueId { get; set; }

    public int OrganizadorId { get; set; }

    public Venue? Venue { get; set; }

    public Usuario? Organizador { get; set; }

    public ICollection<Lote> Lotes { get; set; } = new HashSet<Lote>();

    public ICollection<Entrada> Entradas { get; set; } = new HashSet<Entrada>();

    public ICollection<Compra> Compras { get; set; } = new HashSet<Compra>();
}