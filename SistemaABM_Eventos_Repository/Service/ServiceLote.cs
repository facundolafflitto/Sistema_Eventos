using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaABM_Eventos_Repository.Interface;        // IServiceLote
using SistemaABM_Eventos_TransferObject.ModelsDTO;     // LoteEntradaDTO (posicional)
using SistemaABM_Eventos_Data;                         // BDSistemaEventosContext
using SistemaABM_Eventos_Data.Models;                  // Entidades -> LoteEntrada

namespace SistemaABM_Eventos_Repository.Service         // ✅ corregido: "Service" (no "Sevice")
{
    public class ServiceLote : IServiceLote
    {
        private readonly BDSistemaEventosContext _context;

        public ServiceLote(BDSistemaEventosContext context)
        {
            _context = context;
        }

        public async Task<List<LoteEntradaDTO>> PorEvento(int eventoId)
        {
            return await _context.Lotes
                .AsNoTracking()
                .Where(l => l.EventoId == eventoId)
                .OrderBy(l => l.Precio)
                .Select(l => new LoteEntradaDTO(
                    l.Id,
                    l.EventoId,
                    l.Nombre,
                    l.Precio,
                    l.Cupo,
                    l.Vendidas,
                    l.VigenteDesde,
                    l.VigenteHasta
                ))
                .ToListAsync();
        }

        public async Task<int> Crear(LoteEntradaDTO dto)
        {
            var lote = new LoteEntrada
            {
                EventoId      = dto.EventoId,
                Nombre        = dto.Nombre,
                Precio        = dto.Precio,
                Cupo          = dto.Cupo,
                Vendidas      = dto.Vendidas,
                VigenteDesde  = dto.VigenteDesde,
                VigenteHasta  = dto.VigenteHasta
            };

            _context.Lotes.Add(lote);
            await _context.SaveChangesAsync();
            return lote.Id;
        }

        public async Task<bool> Editar(LoteEntradaDTO dto)
        {
            var lote = await _context.Lotes.FindAsync(dto.Id);
            if (lote is null) return false;

            lote.Nombre       = dto.Nombre;
            lote.Precio       = dto.Precio;
            lote.Cupo         = dto.Cupo;
            lote.Vendidas     = dto.Vendidas;
            lote.VigenteDesde = dto.VigenteDesde;
            lote.VigenteHasta = dto.VigenteHasta;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Eliminar(int id)
        {
            var lote = await _context.Lotes.FindAsync(id);
            if (lote is null) return false;

            _context.Lotes.Remove(lote);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
