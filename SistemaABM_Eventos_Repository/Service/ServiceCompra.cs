using SistemaABM_Eventos_Repository.Interface;         // <- ESTE
using SistemaABM_Eventos_TransferObject.ModelsDTO;     // DTOs
using SistemaABM_Eventos_Data;                          // DbContext
using SistemaABM_Eventos_Data.Models;                   // Entidades (si las usás directo)
using Microsoft.EntityFrameworkCore;                    // EF Core

namespace SistemaABM_Eventos_Repository.Service;

public class ServiceCompra : IServiceCompra
{
    private readonly BDSistemaEventosContext _db;
    public ServiceCompra(BDSistemaEventosContext db) => _db = db;

public async Task<CompraDTO> Comprar(ComprarRequestDTO dto)
{
    if (dto.Items is null || dto.Items.Count == 0)
        throw new InvalidOperationException("Sin items.");

    using var tx = await _db.Database.BeginTransactionAsync();

    decimal total = 0m;
    var entradas = new List<Entrada>();

    foreach (var it in dto.Items)
    {
        var lote = await _db.Lotes.FirstOrDefaultAsync(l => l.Id == it.LoteId && l.EventoId == it.EventoId);
        if (lote is null)
            throw new InvalidOperationException("Lote inválido.");

        // ❌ Eliminada la validación de fechas
        // El lote siempre se considera vigente según pedido del usuario

        if (lote.Vendidas + it.Cantidad > lote.Cupo)
            throw new InvalidOperationException($"Cupo insuficiente en {lote.Nombre}.");

        lote.Vendidas += it.Cantidad;
        total += it.Cantidad * lote.Precio;

        var i = 0;
        while (i < it.Cantidad)   // sin 'for', usando while
        {
            entradas.Add(new Entrada
            {
                EventoId = it.EventoId,
                LoteEntradaId = it.LoteId,
                Codigo = Guid.NewGuid().ToString("N").ToUpperInvariant()
            });

            i++;
        }

        _db.Lotes.Update(lote);
    }

    var compra = new Compra
    {
        UsuarioId = dto.UsuarioId,
        EmailContacto = dto.Email,
        DireccionEnvio = dto.DireccionEnvio,
        MetodoPago = dto.MetodoPago,
        Total = total,
        Estado = "Creado"
    };

    _db.Compras.Add(compra);
    await _db.SaveChangesAsync();

    foreach (var en in entradas)
    {
        en.CompraId = compra.Id;
        _db.Entradas.Add(en);
    }

    await _db.SaveChangesAsync();
    await tx.CommitAsync();

    return new CompraDTO(
        compra.Id,
        compra.EmailContacto,
        compra.Creada,
        compra.Total,
        compra.Estado,
        entradas.Select(e => new EntradaDTO(
            e.Id, e.EventoId, e.LoteEntradaId, e.Codigo, e.Validada, e.FechaValidacion
        )).ToList()
    );
}


    public async Task<CheckInDTO> Validar(string codigo)
    {
        var e = await _db.Entradas.FirstOrDefaultAsync(x => x.Codigo == codigo);
        if (e is null) return new CheckInDTO(codigo, false, null);
        if (!e.Validada) { e.Validada = true; e.FechaValidacion = DateTime.UtcNow; await _db.SaveChangesAsync(); }
        return new CheckInDTO(codigo, e.Validada, e.FechaValidacion);
    }
}
