using System;
using System.Collections.Generic;
using SistemaABM_Eventos_TransferObject.Entradas;

namespace SistemaABM_Eventos_TransferObject.Lotes;

public class LoteDto
{
    public int LoteId { get; set; }

    public int EventoId { get; set; }

    public string? Nombre { get; set; }

    public decimal Precio { get; set; }

    public int CantidadDisponible { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public ICollection<EntradaDto> Entradas { get; set; } = new List<EntradaDto>();
}