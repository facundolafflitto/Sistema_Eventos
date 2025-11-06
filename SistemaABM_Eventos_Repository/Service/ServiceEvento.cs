using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaABM_Eventos_Data;
using SistemaABM_Eventos_Data.Models;
using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.Eventos;

namespace SistemaABM_Eventos_Repository.Service;

public class ServiceEvento : IServiceEvento
{
    private readonly BDSistemaEventosContext _context;
    private readonly IMapper _mapper;

    public ServiceEvento(BDSistemaEventosContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<EventoDto>> ObtenerTodosAsync(CancellationToken cancellationToken = default)
    {
        var eventos = await ConstruirConsultaEventos()
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<EventoDto>>(eventos);
    }

    public async Task<EventoDto?> ObtenerPorIdAsync(int eventoId, CancellationToken cancellationToken = default)
    {
        var evento = await ConstruirConsultaEventos()
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.EventoId == eventoId, cancellationToken);

        return evento is null ? null : _mapper.Map<EventoDto>(evento);
    }

    public async Task<EventoDto> CrearAsync(EventoDto eventoDto, CancellationToken cancellationToken = default)
    {
        var entidad = _mapper.Map<Evento>(eventoDto);

        await _context.Eventos.AddAsync(entidad, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var eventoCreado = await ObtenerEventoDetalladoAsync(entidad.EventoId, cancellationToken);
        return eventoCreado ?? _mapper.Map<EventoDto>(entidad);
    }

    public async Task<EventoDto?> ActualizarAsync(int eventoId, EventoDto eventoDto, CancellationToken cancellationToken = default)
    {
        var eventoExistente = await ConstruirConsultaEventos()
            .FirstOrDefaultAsync(e => e.EventoId == eventoId, cancellationToken);

        if (eventoExistente is null)
        {
            return null;
        }

        _mapper.Map(eventoDto, eventoExistente);
        await _context.SaveChangesAsync(cancellationToken);

        return await ObtenerEventoDetalladoAsync(eventoId, cancellationToken);
    }

    public async Task<bool> EliminarAsync(int eventoId, CancellationToken cancellationToken = default)
    {
        var evento = await _context.Eventos
            .FirstOrDefaultAsync(e => e.EventoId == eventoId, cancellationToken);

        if (evento is null)
        {
            return false;
        }

        _context.Eventos.Remove(evento);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private IQueryable<Evento> ConstruirConsultaEventos()
    {
        return _context.Eventos
            .Include(e => e.Venue)
            .Include(e => e.Organizador)
            .Include(e => e.Lotes)
                .ThenInclude(l => l.Entradas)
            .Include(e => e.Lotes)
                .ThenInclude(l => l.DetalleCompras)
            .Include(e => e.Entradas)
            .Include(e => e.Compras)
                .ThenInclude(c => c.Entradas)
            .Include(e => e.Compras)
                .ThenInclude(c => c.DetalleCompras)
            .AsSplitQuery();
    }

    private async Task<EventoDto?> ObtenerEventoDetalladoAsync(int eventoId, CancellationToken cancellationToken)
    {
        var eventoActualizado = await ConstruirConsultaEventos()
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.EventoId == eventoId, cancellationToken);

        return eventoActualizado is null ? null : _mapper.Map<EventoDto>(eventoActualizado);
    }
}