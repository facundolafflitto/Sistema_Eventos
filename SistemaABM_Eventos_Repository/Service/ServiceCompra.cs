using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.ModelsDTO;
using SistemaABM_Eventos_Data;
using SistemaABM_Eventos_Data.Models;
using Microsoft.EntityFrameworkCore;

namespace SistemaABM_Eventos_Repository.Service
{
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
                var lote = await _db.Lotes
                    .Include(l => l.Evento)
                    .FirstOrDefaultAsync(l => l.Id == it.LoteId && l.EventoId == it.EventoId);

                if (lote is null)
                    throw new InvalidOperationException("Lote inválido.");

                if (lote.Vendidas + it.Cantidad > lote.Cupo)
                    throw new InvalidOperationException($"Cupo insuficiente en {lote.Nombre}.");

                lote.Vendidas += it.Cantidad;
                total += it.Cantidad * lote.Precio;

                int i = 0;
                while (i < it.Cantidad)
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

            // 🔥 DTO COMPLETO CON EVENTO, LOTE Y PRECIO
            var entradasDto = await _db.Entradas
                .Where(e => e.CompraId == compra.Id)
                .Include(e => e.Evento)
                .Include(e => e.LoteEntrada)
                .Select(e => new EntradaDTO(
                    e.Id,
                    e.EventoId,
                    e.LoteEntradaId,
                    e.Codigo,
                    e.Validada,
                    e.FechaValidacion,
                    e.Evento.Nombre,
                    e.LoteEntrada.Nombre,
                    e.LoteEntrada.Precio
                ))
                .ToListAsync();

            return new CompraDTO(
                compra.Id,
                compra.EmailContacto,
                compra.Creada,
                compra.Total,
                compra.Estado,
                entradasDto
            );
        }



        public async Task<CheckInDTO> Validar(string codigo)
        {
            var e = await _db.Entradas.FirstOrDefaultAsync(x => x.Codigo == codigo);
            if (e is null) return new CheckInDTO(codigo, false, null);

            if (!e.Validada)
            {
                e.Validada = true;
                e.FechaValidacion = DateTime.UtcNow;
                await _db.SaveChangesAsync();
            }

            return new CheckInDTO(codigo, e.Validada, e.FechaValidacion);
        }



        public async Task<List<CompraDTO>> ObtenerPorUsuario(int usuarioId)
        {
            var compras = await _db.Compras
                .Where(c => c.UsuarioId == usuarioId)
                .Include(c => c.Entradas)
                    .ThenInclude(e => e.Evento)
                .Include(c => c.Entradas)
                    .ThenInclude(e => e.LoteEntrada)
                .ToListAsync();

            return compras.Select(c => new CompraDTO(
                c.Id,
                c.EmailContacto,
                c.Creada,
                c.Total,
                c.Estado,
                c.Entradas.Select(e => new EntradaDTO(
                    e.Id,
                    e.EventoId,
                    e.LoteEntradaId,
                    e.Codigo,
                    e.Validada,
                    e.FechaValidacion,
                    e.Evento.Nombre,
                    e.LoteEntrada.Nombre,
                    e.LoteEntrada.Precio
                )).ToList()
            )).ToList();
        }
    }
}
