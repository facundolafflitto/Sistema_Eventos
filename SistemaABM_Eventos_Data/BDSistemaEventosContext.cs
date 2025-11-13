using Microsoft.EntityFrameworkCore;
using SistemaABM_Eventos_Data.Models;

namespace SistemaABM_Eventos_Data;

public class BDSistemaEventosContext : DbContext
{
    public BDSistemaEventosContext(DbContextOptions<BDSistemaEventosContext> options) 
        : base(options) { }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Venue> Venues => Set<Venue>();
    public DbSet<Evento> Eventos => Set<Evento>();
    public DbSet<LoteEntrada> Lotes => Set<LoteEntrada>();
    public DbSet<Compra> Compras => Set<Compra>();
    public DbSet<Entrada> Entradas => Set<Entrada>();

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.HasDefaultSchema("app");

    modelBuilder.Entity<LoteEntrada>()
        .Property(l => l.Precio)
        .HasPrecision(18, 2);

    modelBuilder.Entity<Compra>()
        .Property(c => c.Total)
        .HasPrecision(18, 2);

    modelBuilder.Entity<LoteEntrada>()
        .Property(l => l.RowVersion)
        .IsRowVersion()
        .IsConcurrencyToken();

    modelBuilder.Entity<Entrada>()
        .HasOne(e => e.LoteEntrada)
        .WithMany()
        .HasForeignKey(e => e.LoteEntradaId)
        .OnDelete(DeleteBehavior.Restrict);

    base.OnModelCreating(modelBuilder);
}



}
