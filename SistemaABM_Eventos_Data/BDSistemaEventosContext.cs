using Microsoft.EntityFrameworkCore;
using SistemaABM_Eventos_Data.Models;

namespace SistemaABM_Eventos_Data;

public partial class BDSistemaEventosContext : DbContext
{
    public BDSistemaEventosContext()
    {
    }

    public BDSistemaEventosContext(DbContextOptions<BDSistemaEventosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Usuario> Usuarios { get; set; } = null!;
    public virtual DbSet<Venue> Venues { get; set; } = null!;
    public virtual DbSet<Evento> Eventos { get; set; } = null!;
    public virtual DbSet<Lote> Lotes { get; set; } = null!;
    public virtual DbSet<Entrada> Entradas { get; set; } = null!;
    public virtual DbSet<Compra> Compras { get; set; } = null!;
    public virtual DbSet<DetalleCompra> DetalleCompras { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId);

            entity.HasIndex(e => e.Email)
                  .IsUnique();

            entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.Apellido).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Telefono).HasMaxLength(20);
            entity.Property(e => e.EsOrganizador).HasDefaultValue(false);
            entity.Property(e => e.FechaRegistro)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Venue>(entity =>
        {
            entity.HasKey(e => e.VenueId);

            entity.HasIndex(e => e.Nombre)
                  .IsUnique();

            entity.Property(e => e.VenueId).HasColumnName("VenueID");
            entity.Property(e => e.Nombre).HasMaxLength(120);
            entity.Property(e => e.Direccion).HasMaxLength(250);
            entity.Property(e => e.Ciudad).HasMaxLength(80);
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.EventoId);

            entity.Property(e => e.EventoId).HasColumnName("EventoID");
            entity.Property(e => e.Nombre).HasMaxLength(150);
            entity.Property(e => e.Codigo)
                  .HasMaxLength(20);
            entity.Property(e => e.Estado)
                  .HasMaxLength(40)
                  .HasDefaultValue("Borrador");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");
            entity.Property(e => e.FechaFin).HasColumnType("datetime");
            entity.Property(e => e.VenueId).HasColumnName("VenueID");
            entity.Property(e => e.OrganizadorId).HasColumnName("OrganizadorID");

            entity.HasIndex(e => e.Codigo).IsUnique();

            entity.HasOne(d => d.Venue)
                  .WithMany(p => p.Eventos)
                  .HasForeignKey(d => d.VenueId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .HasConstraintName("FK_Eventos_Venues");

            entity.HasOne(d => d.Organizador)
                  .WithMany(p => p.EventosOrganizados)
                  .HasForeignKey(d => d.OrganizadorId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .HasConstraintName("FK_Eventos_Usuarios");
        });

        modelBuilder.Entity<Lote>(entity =>
        {
            entity.HasKey(e => e.LoteId);

            entity.ToTable("Lotes");

            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.EventoId).HasColumnName("EventoID");
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Precio).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");
            entity.Property(e => e.FechaFin).HasColumnType("datetime");

            entity.HasIndex(e => new { e.EventoId, e.Nombre })
                  .IsUnique();

            entity.HasOne(d => d.Evento)
                  .WithMany(p => p.Lotes)
                  .HasForeignKey(d => d.EventoId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .HasConstraintName("FK_Lotes_Eventos");
        });

        modelBuilder.Entity<Entrada>(entity =>
        {
            entity.HasKey(e => e.EntradaId);

            entity.Property(e => e.EntradaId).HasColumnName("EntradaID");
            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.Codigo).HasMaxLength(30);
            entity.Property(e => e.PrecioVenta).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Estado)
                  .HasMaxLength(30)
                  .HasDefaultValue("Disponible");

            entity.HasIndex(e => e.Codigo).IsUnique();

            entity.HasOne(d => d.Lote)
                  .WithMany(p => p.Entradas)
                  .HasForeignKey(d => d.LoteId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .HasConstraintName("FK_Entradas_Lotes");

            entity.HasOne(d => d.Compra)
                  .WithMany(p => p.Entradas)
                  .HasForeignKey(d => d.CompraId)
                  .OnDelete(DeleteBehavior.SetNull)
                  .HasConstraintName("FK_Entradas_Compras");
        });

        modelBuilder.Entity<Compra>(entity =>
        {
            entity.HasKey(e => e.CompraId);

            entity.Property(e => e.CompraId).HasColumnName("CompraID");
            entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");
            entity.Property(e => e.EventoId).HasColumnName("EventoID");
            entity.Property(e => e.TotalCompra).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.FechaCompra)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Usuario)
                  .WithMany(p => p.Compras)
                  .HasForeignKey(d => d.UsuarioId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .HasConstraintName("FK_Compras_Usuarios");

            entity.HasOne(d => d.Evento)
                  .WithMany(p => p.Compras)
                  .HasForeignKey(d => d.EventoId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .HasConstraintName("FK_Compras_Eventos");
        });

        modelBuilder.Entity<DetalleCompra>(entity =>
        {
            entity.HasKey(e => e.DetalleCompraId);

            entity.ToTable("Detalle_Compra");

            entity.Property(e => e.DetalleCompraId).HasColumnName("DetalleCompraID");
            entity.Property(e => e.CompraId).HasColumnName("CompraID");
            entity.Property(e => e.LoteId).HasColumnName("LoteID");
            entity.Property(e => e.PrecioUnitario).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Subtotal).HasColumnType("decimal(10, 2)");

            entity.HasIndex(e => new { e.CompraId, e.LoteId }).IsUnique();

            entity.HasOne(d => d.Compra)
                  .WithMany(p => p.DetalleCompras)
                  .HasForeignKey(d => d.CompraId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .HasConstraintName("FK_DetalleCompra_Compras");

            entity.HasOne(d => d.Lote)
                  .WithMany(p => p.DetalleCompras)
                  .HasForeignKey(d => d.LoteId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .HasConstraintName("FK_DetalleCompra_Lotes");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}