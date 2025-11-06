using System;
using System.Collections.Generic;

namespace SistemaABM_Eventos_Data.Models;

public class Compra
{
    public int CompraId { get; set; }

    public int UsuarioId { get; set; }

    public int EventoId { get; set; }

    public DateTime FechaCompra { get; set; }

    public decimal TotalCompra { get; set; }

    public Usuario? Usuario { get; set; }

    public Evento? Evento { get; set; }

    public ICollection<Entrada> Entradas { get; set; } = new HashSet<Entrada>();

    public ICollection<DetalleCompra> DetalleCompras { get; set; } = new HashSet<DetalleCompra>();
}