using System;
using System.Collections.Generic;
using SistemaABM_Eventos_TransferObject.Entradas;
using SistemaABM_Eventos_TransferObject.Usuarios;

namespace SistemaABM_Eventos_TransferObject.Compras;

public class CompraDto
{
    public int CompraId { get; set; }

    public int UsuarioId { get; set; }

    public int EventoId { get; set; }

    public DateTime FechaCompra { get; set; }

    public decimal TotalCompra { get; set; }

    public UsuarioDto? Usuario { get; set; }

    public ICollection<EntradaDto> Entradas { get; set; } = new List<EntradaDto>();

    public ICollection<DetalleCompraDto> DetalleCompras { get; set; } = new List<DetalleCompraDto>();
}