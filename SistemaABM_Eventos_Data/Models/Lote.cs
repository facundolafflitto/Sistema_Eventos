using System;
using System.Collections.Generic;

namespace SistemaABM_Eventos_Data.Models;

public class Lote
{
    public int LoteId { get; set; }

    public int EventoId { get; set; }

    public string? Nombre { get; set; }

    public decimal Precio { get; set; }

    public int CantidadDisponible { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public Evento? Evento { get; set; }

    public ICollection<Entrada> Entradas { get; set; } = new HashSet<Entrada>();

    public ICollection<DetalleCompra> DetalleCompras { get; set; } = new HashSet<DetalleCompra>();
}